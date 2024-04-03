using System;
using System.Runtime.Intrinsics;

namespace RayTracerEllipsoidsVolumetric
{
    public class Ellipsoid : Geometry
    {
        private Vector Center { get; }
        private Vector SemiAxesLength { get; }
        private Vector SemiAxesLengthSquared { get; } // Represents the squared semi-axes lengths.
        private double Radius { get; }

        public Ellipsoid(Vector center, Vector semiAxesLength, double radius, Material material, Color color) : base(material, color)
        {
            Center = center;
            SemiAxesLength = semiAxesLength;
            // Calculate the squared semi-axes lengths for use in intersection calculations.
            SemiAxesLengthSquared = new Vector(SemiAxesLength.X * SemiAxesLength.X, SemiAxesLength.Y * SemiAxesLength.Y, SemiAxesLength.Z * SemiAxesLength.Z);
            Radius = radius;
        }

        public Ellipsoid(Vector center, Vector semiAxesLength, double radius, Color color) : base(color)
        {
            Center = center;
            SemiAxesLength = semiAxesLength;
            SemiAxesLengthSquared = new Vector(SemiAxesLength.X * SemiAxesLength.X, SemiAxesLength.Y * SemiAxesLength.Y, SemiAxesLength.Z * SemiAxesLength.Z);
            Radius = radius;
        }

        // Normalize the components of the input vector relative to the semi-axes lengths.
        private Vector NormalizeRelativeToSemiAxes(Vector inputVector)
        {
            // Divide each component of the input vector by the corresponding semi-axes length.
            return new Vector(inputVector.X / SemiAxesLength.X, inputVector.Y / SemiAxesLength.Y, inputVector.Z / SemiAxesLength.Z);
        }

        // Normalize the components of the input vector relative to the squared semi-axes lengths.
        private Vector NormalizeRelativeToSquaredSemiAxes(Vector inputVector)
        {
            // Divide each component of the input vector by the corresponding squared semi-axes length.
            return new Vector(inputVector.X / SemiAxesLengthSquared.X, inputVector.Y / SemiAxesLengthSquared.Y, inputVector.Z / SemiAxesLengthSquared.Z);
        }

        // Compute the first and last intersection points between the input line and the bounding ellipsoid.
        public Tuple<double?, double?> GetFirstAndLastIntersection(Line inputLine)
        {
            // Normalize the direction vector of the line relative to the semi-axes lengths.
            var normalizedDirectionRelativeToSemiAxes = NormalizeRelativeToSemiAxes(inputLine.Dx);

            // Normalize the vector from the ellipsoid center to the starting point of the line relative to the semi-axes lengths.
            var pointRelativeToSemiAxes = NormalizeRelativeToSemiAxes(inputLine.X0 - Center);

            // Compute coefficients for the quadratic equation.
            var a = normalizedDirectionRelativeToSemiAxes.Length2();
            var b = normalizedDirectionRelativeToSemiAxes * pointRelativeToSemiAxes * 2;
            var c = pointRelativeToSemiAxes.Length2() - Radius * Radius;

            // Compute the discriminant of the quadratic equation.
            var discriminant = b * b - 4 * a * c;

            // Check for no real solutions (discriminant less than epsilon).
            if (discriminant < 1e-10) return new Tuple<double?, double?>(null, null);

            // Check for a repeated root (discriminant almost zero).
            if (Math.Abs(discriminant) < 1e-10)
            {
                // Return one valid root and one null value.
                return new Tuple<double?, double?>(-b / (2 * a), null);
            }

            // Calculate square root of the discriminant.
            var sqrtDiscriminant = Math.Sqrt(discriminant);

            // Compute the two roots of the quadratic equation.
            var inverse2A = 1 / (2 * a);
            var root1 = (-b - sqrtDiscriminant) * inverse2A;
            var root2 = (-b + sqrtDiscriminant) * inverse2A;

            // Return the roots as a tuple.
            return new Tuple<double?, double?>(root1, root2);
        }

        // Compute the intersection between the line and the ellipsoid within the specified distance range.
        public override Intersection GetIntersection(Line line, double minDist, double maxDist, bool? onlyFirst)
        {
            // Get the first and last intersection points between the line and the bounding ellipsoid.
            var (firstRoot, lastRoot) = GetFirstAndLastIntersection(line);

            // If there is no valid intersection, return Intersection.NONE.
            if (firstRoot == null)
            {
                return Intersection.NONE;
            }

            // If there is only one valid root, compute information for that intersection point.
            if (lastRoot == null)
            {
                var t = firstRoot ?? 0;
                var isVisible = t >= minDist && t <= maxDist;
                var position = line.CoordinateToPosition(t);

                // Compute the normal vector at the intersection point.
                var normal = NormalizeRelativeToSquaredSemiAxes((position - Center) * 2).Normalize();

                // Return an Intersection object for the single intersection point.
                return new Intersection(true, isVisible, this, line, t, normal, Material, Color);
            }
            else
            {
                // If there are two valid roots, determine visibility and closest point.
                var isVisible = (firstRoot >= minDist && firstRoot <= maxDist) || (lastRoot >= minDist && lastRoot <= maxDist);
                var t = (firstRoot >= minDist ? firstRoot : lastRoot) ?? 0; // closest point
                var position = line.CoordinateToPosition(t);

                // Compute the normal vector at the intersection point.
                var normal = NormalizeRelativeToSquaredSemiAxes((position - Center) * 2).Normalize();

                // Return an Intersection object for the intersection with visibility and closest point considerations.
                return new Intersection(true, isVisible, this, line, t, normal, Material, Color);
            }
        }
    }
}