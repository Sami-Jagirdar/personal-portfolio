"use client";
import Image from "next/image";

export default function FinalProject() {
    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold">Final Project - Autonomous Driving test in Duckietown</h1>
            <h3 className="text-xl text-silver mt-4">Sami Jagirdar [ccid: jagirdar]   <span className='text-accent'>|</span>    Basia Ofovwe [ccid: ofovwe]</h3>
            <p className="mt-4">Technologies used: <span className='text-accent'>Python, ROS, OpenCV, Duckietown</span> </p>

            <p className="mt-4">The final project for CMPUT 412 was to autonomously complete a 4 stage course, each with its own task.</p>

            <section className="mt-4">
            <h2 className="text-2xl font-semibold mt-6">Stage 1: Duckiebot Tailing</h2>
            <p>
                For the first stage, we were required to tail a duckiebot driving in front of our bot around part of the town. <br/>
                <div className="relative mt-6 w-full max-w-lg mx-auto flex justify-center">
                    <Image
                        src="/leading_bot.png"
                        alt="Duckiebot Setup"
                        width={300}
                        height={200}
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <p className="text-center text-sm text-gray-400 mt-2">Fig 1.1 The back of the leading bot</p>
            </p>

            {/* Subsection 1 */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Following the Leading Bot</h3>
                <p className="mt-2">
                The leading bot followed one of two paths around the town. Our bot was required to follow it while dynamically adjusting speed.
                <br /><br />
                <span className="font-medium">Our solution:</span> We detected the 7×3 black circle grid on the back of the leading bot using OpenCV&apos;s <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">cv2.SimpleBlobDetector</code> and <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">cv2.findCirclesGrid</code>. A proportional controller adjusted our bot’s linear velocity based on the perceived size of the pattern (larger pattern = closer distance). A second proportional controller centered the pattern in the image, adjusting the angular velocity accordingly. <br/>
                Note: We also run lane following in the background to ensure we stay on the road. (See Exercise 3 to see how we do lane following)<br/>
                </p>
            </div>

            {/* Subsection 2 */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Navigating Red Line Intersections</h3>
                <p className="mt-2">
                The leading bot would stop at red line intersections and could proceed straight, left, or right.
                <br /><br />
                <span className="font-medium">Our solution:</span> We determined the red intersections HSV range and used OpenCV&apos;s <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.findContours</code> to detect red contours. Based on the size of the intersection, we know how close we are and we stop. <br/>
                Further, to know which direction the leading bot is going, we know that the leading bot&apos;s body is blue in color. We found the HSV range and detect the last position of its contour. We then check the position of the contour in relation to the center of our camera&apos;s view. If it is on the left, we know that the leading bot is going left, and so on. <br/>
                Once our bot has stopped for 3 seconds at the red intersection, we use deadreckoning and odometry to move our bot in the direction of the leading bot. We then lane follow until the leading bot is in view of our bot and continue tailing again.
                </p>
            </div>

            {/* Subsection 3 */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Collision Avoidance</h3>
                <p className="mt-2">
                Our bot needed to ensure it never collided with the leading bot during tailing.
                <br /><br />
                <span className="font-medium">Our solution:</span> If the circle pattern on the back of the bot ever becomes too large, we know our bot needs to stop. We also utilized the TOF sensor as a failsafe on the front of our bot to detect if we are too close to the leading bot. If either of these conditions are met, we stop our bot. <br/>
                (A TOF sensor is a time of flight sensor that uses infrared light to measure distance. It works by emitting a pulse of light and measuring the time it takes for the light to bounce back to the sensor. This allows it to calculate the distance to an object with high accuracy.)
                </p>
            </div>
            </section>

            <h2 className="text-2xl font-semibold mt-6">Stage 2: AprilTag Detection</h2>
        </div>
    );
    }