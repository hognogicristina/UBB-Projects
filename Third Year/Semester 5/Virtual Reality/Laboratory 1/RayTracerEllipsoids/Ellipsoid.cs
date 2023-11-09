using System;


namespace rt
{
    public class Ellipsoid : Geometry
    {
        private Vector Center { get; }
        private Vector SemiAxesLength { get; }
        private double Radius { get; }
        
        public Vector GetCenter()
        {
            return Center;
        }
        
        public Ellipsoid(Vector center, Vector semiAxesLength, double radius, Material material, Color color) : base(material, color)
        {
            Center = center;
            SemiAxesLength = semiAxesLength;
            Radius = radius;
        }

        public Ellipsoid(Vector center, Vector semiAxesLength, double radius, Color color) : base(color)
        {
            Center = center;
            SemiAxesLength = semiAxesLength;
            Radius = radius;
        }

        public override Intersection GetIntersection(Line line, double minDist, double maxDist)
        {
            // Transform the ray to the ellipsoid's object space
            Vector dir = line.Dx; // Assuming Dx is the direction vector of the ray and is normalized
            Vector oc = line.X0 - Center; // Vector from ray origin to center of ellipsoid

            // Scale the components of the direction and oc by the semi-axes lengths
            oc.Divide(SemiAxesLength);
            dir.Divide(SemiAxesLength);

            double a = dir.Dot(dir); // Coefficient A in the quadratic equation
            double b = 2.0 * oc.Dot(dir); // Coefficient B in the quadratic equation
            double c = oc.Dot(oc) - Radius * Radius; // Coefficient C in the quadratic equation

            // Calculate the discriminant
            double discriminant = b * b - 4 * a * c;
            if (discriminant < 0)
            {
                return new Intersection(); // No intersection
            }

            // Calculate the two possible intersections (t0 and t1)
            double discriminantRoot = Math.Sqrt(discriminant);
            double t0 = (-b - discriminantRoot) / (2 * a);
            double t1 = (-b + discriminantRoot) / (2 * a);

            // Check if either of the intersections are within the allowed range
            if (t0 > maxDist || t1 < minDist)
            {
                return new Intersection(); // Both intersections are out of range
            }

            double t = t0; // Assume t0 is the closer intersection and within range
            if (t0 < minDist)
            {
                if (t1 > maxDist)
                {
                    return new Intersection(); // t1 is also out of range
                }
                t = t1; // t0 is out of range, so use t1
            }

            // If an intersection has occurred within the valid range, calculate the intersection details
            if (t >= minDist && t <= maxDist)
            {
                Vector position = line.X0 + dir * t; // The position of the intersection
                Vector normal = (position - Center);
                normal.Divide(SemiAxesLength);
                normal = normal.Normalize(); // The normal at the intersection

                // Ensure that the Intersection constructor is called with the correct order of parameters
                return new Intersection(true, true, this, line, t, normal);
            }

            // If no valid intersection is found, return a default Intersection object
            return new Intersection();
        }

    }
}
