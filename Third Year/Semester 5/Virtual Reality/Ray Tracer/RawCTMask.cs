using System;
using System.IO;
using System.Text.RegularExpressions;

namespace RayTracerEllipsoidsVolumetric;

public class RawCtMask: Geometry
{
    private readonly Vector _position; // Position of the lower-left corner of the mask
    private readonly double _scale; // Scale factor for the mask
    private readonly ColorMap _colorMap; // Color map for the mask
    private readonly byte[] _data; // Raw data for the mask

    private readonly int[] _resolution = new int[3]; // Resolution of the mask in voxels
    private readonly double[] _thickness = new double[3]; // Thickness of the mask in mm
    private readonly Vector _v0; // Position of the lower-left corner of the mask
    private readonly Vector _v1; // Position of the upper-right corner of the mask
    private readonly Ellipsoid _boundingEllipsoid; // Bounding ellipsoid for the mask
    
    public RawCtMask(string datFile, string rawFile, Vector position, double scale, ColorMap colorMap) : base(Color.NONE)
    {
        // Store the position, scale, and color map
        _position = position;
        _scale = scale;
        _colorMap = colorMap;

        var lines = File.ReadLines(datFile);
        foreach (var line in lines)
        {
            var kv = Regex.Replace(line, "[:\\t ]+", ":").Split(":");
            if (kv[0] == "Resolution")
            {
                _resolution[0] = Convert.ToInt32(kv[1]);
                _resolution[1] = Convert.ToInt32(kv[2]);
                _resolution[2] = Convert.ToInt32(kv[3]);
            }
            else if (kv[0] == "SliceThickness")
            {
                _thickness[0] = Convert.ToDouble(kv[1]);
                _thickness[1] = Convert.ToDouble(kv[2]);
                _thickness[2] = Convert.ToDouble(kv[3]);
            }
        }

        _v0 = position;
        var diagonal = new Vector
            (
                _resolution[0] * _thickness[0] * scale,
                _resolution[1] * _thickness[1] * scale,
                _resolution[2] * _thickness[2] * scale
            );
        _v1 = position + diagonal;

        var len = _resolution[0] * _resolution[1] * _resolution[2];
        _data = new byte[len];
        using FileStream f = new FileStream(rawFile, FileMode.Open, FileAccess.Read);
        if (f.Read(_data, 0, len) != len)
        {
            throw new InvalidDataException($"Failed to read the {len}-byte raw data");
        }

        var halfDiagonal = diagonal / 2;

        _boundingEllipsoid = new Ellipsoid
            (position + halfDiagonal, halfDiagonal, 1, Color.NONE);
    }

    private ushort Value(int x, int y, int z)
    {
        if (x < 0 || y < 0 || z < 0 || x >= _resolution[0] || y >= _resolution[1] || z >= _resolution[2])
        {
            return 0;
        }

        return _data[z * _resolution[1] * _resolution[0] + y * _resolution[0] + x];
    }

    public override Intersection GetIntersection(Line line, double minDist, double maxDist, bool? onlyFirst)
    {
        // Check for the first and last intersection points with the bounding ellipsoid
        var (t1, t2) = _boundingEllipsoid.GetFirstAndLastIntersection(line);
        // These values help quickly determine if there is a potential intersection with the actual geometry
        // If there is no intersection with the bounding ellipsoid, there can be no intersection with the geometry

        // If either intersection point is null, there is no intersection with the ellipsoid
        if (t1 == null || t2 == null)
        {
            return Intersection.NONE;
        }

        // Determine the valid range of parameter values (t) for intersection within the specified distance range
        var start = Math.Max(t1 ?? 0, minDist);
        var end = Math.Min(t2 ?? 0, maxDist);

        // Set the step size for sampling points along the line
        var stepSize = _scale;

        // Initialize variables for tracking information about the intersection
        var firstIntersection = 0d; // Parameter value of the first intersection point
        var normal = new Vector();  // Normal vector at the intersection point
        var globalColor = new Color(); // Accumulated color at the intersection point
        var lastAlpha = 1d; // Accumulated alpha value for transparency
        var passedFirst = false; // Flag indicating whether the first intersection point has been passed

        // Iterate through parameter values along the line within the specified range
        // Helps identify the first and last intersections along a ray for more accurate rendering
        for (var t = start; t <= end; t += stepSize)
        {
            // Convert the parameter value to a 3D point on the line
            var point = line.CoordinateToPosition(t);

            // Get the voxel indices corresponding to the 3D point
            var idx = GetIndexes(point);

            // Get the color of the voxel at the specified indices
            var pointColor = GetColor(idx);

            // If the voxel is completely transparent, skip to the next iteration
            if (pointColor.Alpha == 0) continue;

            // If this is the first non-transparent voxel encountered
            if (!passedFirst)
            {
                // Update information about the first intersection point
                firstIntersection = t;
                normal = GetNormal(idx);
                passedFirst = true;

                // If only the first intersection is requested, return the intersection
                if (onlyFirst == true)
                {
                    return new Intersection(true, true, this, line, t, normal, Material, Color.NONE);
                }
            }

            // Accumulate color considering transparency
            globalColor += pointColor * pointColor.Alpha * lastAlpha;

            // Update the accumulated alpha value for transparency
            lastAlpha *= 1 - pointColor.Alpha;

            // If transparency becomes negligible, break from the loop
            if (lastAlpha < 1e-10) break;
        }

        // Create and return an Intersection object with information about the intersection
        return new Intersection
            (
                true,
                passedFirst,
                this,
                line,
                firstIntersection,
                normal,
                Material.FromColor(globalColor),
                globalColor
            );
    }


    private int[] GetIndexes(Vector v)
    {
        return new[]{
            (int)Math.Floor((v.X - _position.X) / _thickness[0] / _scale),
            (int)Math.Floor((v.Y - _position.Y) / _thickness[1] / _scale),
            (int)Math.Floor((v.Z - _position.Z) / _thickness[2] / _scale)};
    }

    // Takes the indexes of the Vector instead of the vector itself
    private Color GetColor(int[] idx)
    {
        ushort value = Value(idx[0], idx[1], idx[2]);
        return _colorMap.GetColor(value);
    }

    // Takes the indexes of the Vector instead of the vector itself
    private Vector GetNormal(int[] idx)
    {
        double x0 = Value(idx[0] - 1, idx[1], idx[2]);
        double x1 = Value(idx[0] + 1, idx[1], idx[2]);
        double y0 = Value(idx[0], idx[1] - 1, idx[2]);
        double y1 = Value(idx[0], idx[1] + 1, idx[2]);
        double z0 = Value(idx[0], idx[1], idx[2] - 1);
        double z1 = Value(idx[0], idx[1], idx[2] + 1);

        return new Vector(x1 - x0, y1 - y0, z1 - z0).Normalize();
    }
}