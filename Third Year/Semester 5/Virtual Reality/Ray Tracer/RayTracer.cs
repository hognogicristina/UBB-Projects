using System;

namespace RayTracerEllipsoidsVolumetric
{
    class RayTracer
    {
        private Geometry[] geometries;
        private Light[] lights;

        public RayTracer(Geometry[] geometries, Light[] lights)
        {
            // Store the geometries and lights in the scene
            this.geometries = geometries; 
            this.lights = lights;
        }

        private double ImageToViewPlane(int n, int imgSize, double viewPlaneSize)
        {
            return -n * viewPlaneSize / imgSize + viewPlaneSize / 2;
        }

        private Intersection FindFirstIntersection(Line ray, double minDist, double maxDist)
        {
            // Find the first intersection of the ray with scene geometries
            var intersection = Intersection.NONE;

            foreach (var geometry in geometries)
            {
                var intr = geometry.GetIntersection(ray, minDist, maxDist);

                if (!intr.Valid || !intr.Visible) continue; // Skip invalid or invisible intersections

                if (!intersection.Valid || !intersection.Visible)
                {
                    // If the current intersection is valid and visible, it is the first intersection
                    intersection = intr;
                }
                else if (intr.T < intersection.T)
                {
                    // If the current intersection is closer than the previous intersection, it is the first intersection
                    intersection = intr;
                }
            }

            return intersection;
        }

        // Determines whether a point is lit by a given light source
        private bool IsLit(Vector point, Light light)
        {
            // Create a line from the point to the light source
            var incidentLine = new Line(point, light.Position);

            // Define a small value for numerical stability
            const double epsilon = 1e-10;

            // Calculate the length of the line segment between the point and the light source
            var segmentLength = (point - light.Position).Length();

            // Check for intersections with scene geometries
            foreach (var geometry in geometries)
            {
                // Skip RawCtMask geometry
                if (geometry is RawCtMask)
                {
                    continue;
                }

                // Check for intersection along the incident line within a limited segment
                var intersection = geometry.GetIntersection(incidentLine, epsilon, segmentLength, true);

                // If an intersection is visible, the point is not lit
                if (intersection.Visible)
                {
                    return false;
                }
            }

            // If no visible intersections are found, the point is lit
            return true;
        }

        // Renders the scene using a ray tracing algorithm
        public void Render(Camera camera, int width, int height, string filename)
        {
            // Define the background color of the rendered image
            var backgroundColor = new Color(0.2, 0.2, 0.2, 1.0);

            // Calculate the normalized view direction parallel to the view plane
            // This vector is parallel to the camera direction and perpendicular to the camera up vector
            var viewParallel = (camera.Up ^ camera.Direction).Normalize();

            // Create an image to store the rendered result
            var renderedImage = new Image(width, height);

            // Calculate the view direction based on the camera parameters
            // This vector is perpendicular to the view plane and points in the direction the camera is looking
            var viewDirection = camera.Direction * camera.ViewPlaneDistance;

            // Loop through each pixel in the image
            for (var i = 0; i < width; i++)
            {
                // Calculate the X coordinate on the view plane
                // This value is the distance from the left edge of the view plane
                var viewPlaneX = ImageToViewPlane(i, width, camera.ViewPlaneWidth);

                // Loop through each row of pixels in the image
                for (var j = 0; j < height; j++)
                {
                    // Calculate the Y coordinate on the view plane
                    // This value is the distance from the bottom edge of the view plane
                    var viewPlaneY = ImageToViewPlane(j, height, camera.ViewPlaneHeight);

                    // Calculate the ray vector from the camera position to the current pixel on the view plane
                    var rayVector = camera.Position                   // 1. Starting from the camera position
                                    + viewDirection                    // 2. Adding the direction in which the camera is looking
                                    + viewParallel * viewPlaneX        // 3. Moving along the horizontal axis of the view plane based on the current pixel's position
                                    + camera.Up * viewPlaneY;          // 4. Moving along the vertical axis of the view plane base d on the current pixel's position

                    var ray = new Line(camera.Position, rayVector);   // Create a Line representing the ray

                    // Find the first intersection of the ray with scene geometries
                    var intersection = FindFirstIntersection(ray, camera.FrontPlaneDistance, camera.BackPlaneDistance);

                    // If no visible intersection is found, set the pixel color to the background color
                    if (!intersection.Visible)
                    {
                        renderedImage.SetPixel(i, j, backgroundColor);
                        continue;
                    }

                    // Extract material and surface properties from the intersection
                    // These values are used to calculate the pixel color
                    var material = intersection.Material;
                    var pixelColor = new Color();
                    var pointOnSurface = intersection.Position;
                    var eyeVector = (camera.Position - pointOnSurface).Normalize();
                    var surfaceNormal = intersection.Normal;

                    // Iterate over each light source to calculate lighting contributions
                    foreach (var light in lights)
                    {
                        // Calculate ambient component
                        var ambientComponent = material.Ambient * light.Ambient;

                        // Check if the point on the surface is lit by the current light source
                        if (IsLit(pointOnSurface, light))
                        {
                            // Calculate light and reflection vectors
                            var lightDirection = (light.Position - pointOnSurface).Normalize();
                            var reflectionDirection = (surfaceNormal * (surfaceNormal * lightDirection) * 2 - lightDirection).Normalize();

                            // Calculate diffuse and specular factors
                            var diffuseFactor = surfaceNormal * lightDirection;
                            var specularFactor = eyeVector * reflectionDirection;

                            // Add diffuse and specular components to the pixel color
                            if (diffuseFactor > 0)
                            {
                                pixelColor += material.Diffuse * light.Diffuse * diffuseFactor;
                            }

                            if (specularFactor > 0)
                            {
                                pixelColor += material.Specular * light.Specular * Math.Pow(specularFactor, material.Shininess);
                            }

                            // Multiply by light intensity
                            pixelColor *= light.Intensity;
                        }

                        // Add ambient component to the pixel color
                        pixelColor += ambientComponent;
                    }

                    // Set the pixel color in the rendered image
                    renderedImage.SetPixel(i, j, pixelColor);
                }
            }
            renderedImage.Store(filename);
        }
    }
}