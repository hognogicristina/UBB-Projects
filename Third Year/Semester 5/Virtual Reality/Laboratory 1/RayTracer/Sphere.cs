﻿using System;

namespace rt
{
    public class Sphere : Geometry
    {
        private Vector Center { get; set; }
        private double Radius { get; set; }

        public Sphere(Vector center, double radius, Material material, Color color) : base(material, color)
        {
            Center = center;
            Radius = radius;
        }

        public Vector GetCenter()
        {
            return Center;
        }

        public override Intersection GetIntersection(Line line, double minDist, double maxDist)
        {
            var timeClosestToCenter = (Center - line.X0) * line.Dx;

            var pointReachedAfterTime = line.CoordinateToPosition(timeClosestToCenter);

            var lengthBetweenCenterAndPoint = (Center - pointReachedAfterTime).Length();

            var distanceBetweenPoints = Math.Sqrt(Radius * Radius - lengthBetweenCenterAndPoint * lengthBetweenCenterAndPoint);

            if (timeClosestToCenter > minDist && timeClosestToCenter < maxDist && lengthBetweenCenterAndPoint <= Radius)
            {
                //timeClosestToCenter-distanceBetweenPoints = the first intersection
                return new Intersection(true, true, this, line, timeClosestToCenter-distanceBetweenPoints);
            }
            return new Intersection();
        }

        public override Vector Normal(Vector v)
        {
            var n = v - Center;
            n.Normalize();
            return n;
        }
    }
}