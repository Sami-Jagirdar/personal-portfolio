"use client";
import Image from "next/image";

export default function FinalProject() {
    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold">Final Project - Autonomous Driving test in Duckietown</h1>
            <h3 className="text-xl text-silver mt-4">Sami Jagirdar [ccid: jagirdar]   <span className='text-accent'>|</span>    Basia Ofovwe [ccid: ofovwe]</h3>
            <p className="mt-4">Technologies used: <span className='text-accent'>Python, ROS, OpenCV, Duckietown</span> </p>

            <p className="mt-4">The final project for CMPUT 412 was to autonomously complete a 4 stage course, each with its own task.</p>
            <div className="relative mt-6 w-full max-w-lg mx-auto flex justify-center">
                <Image
                    src="/full course diagram.jpg"
                    alt="Duckiebot Setup"
                    width={500}
                    height={350}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">Fig 0: Diagram of Duckietown with 4 stages</p>
           

            <section className="mt-4">
            <h2 className="text-2xl font-semibold mt-6">Stage 1: Duckiebot Tailing</h2>
            <p>
                For the first stage, we were required to tail a duckiebot driving in front of our bot around part of the town. <br/>
            </p>
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
           

            {/* Subsection 1 */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Following the Leading Bot</h3>
                <p className="mt-2">
                The leading bot followed one of two paths around the town. Our bot was required to follow it while dynamically adjusting speed.
                <br /><br />
                <span className="font-medium text-amber-400">Our solution:</span> We detected the 7×3 black circle grid on the back of the leading bot using OpenCV&apos;s <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">cv2.SimpleBlobDetector</code> and <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">cv2.findCirclesGrid</code>. A proportional controller adjusted our bot’s linear velocity based on the perceived size of the pattern (larger pattern = closer distance). A second proportional controller centered the pattern in the image, adjusting the angular velocity accordingly. <br/>
                Note: We also run lane following in the background to ensure we stay on the road. (See Exercise 3 to see how we do lane following)<br/>
                </p>
            </div>

            {/* Subsection 2 */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Navigating Red Line Intersections</h3>
                <p className="mt-2">
                The leading bot would stop at red line intersections and could proceed straight, left, or right.
                <br /><br />
                <span className="font-medium text-amber-400">Our solution:</span> We determined the red intersections HSV range and used OpenCV&apos;s <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.findContours</code> to detect red contours. Based on the size of the intersection, we know how close we are and we stop. <br/>
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
                <span className="font-medium text-amber-400">Our solution:</span> If the circle pattern on the back of the bot ever becomes too large, we know our bot needs to stop. We also utilized the TOF sensor as a failsafe on the front of our bot to detect if we are too close to the leading bot. If either of these conditions are met, we stop our bot. <br/>
                (A TOF sensor is a time of flight sensor that uses infrared light to measure distance. It works by emitting a pulse of light and measuring the time it takes for the light to bounce back to the sensor. This allows it to calculate the distance to an object with high accuracy.)
                </p>
            </div>
            </section>


            <section className="mt-4">
            <h2 className="text-2xl font-semibold mt-6">Stage 2: AprilTag Detection</h2>
            <p>
                After the leading bot has completed its path, it would be taken off course and our bot would transition to stage 2. The way we determined that stage 2 had begun was if 3 or more red intersections had been detected and stopped at since we know that the leading bot in stage 1 will always stop at most 3 red intersections in either of its paths<br/>
                In this stage, we were required to detect 2 Apriltags placed on 2 red intersections, and based on the apriltag ID, move either left or right. <br/>
                In between these apriltags, we were required to lane follow. <br/>
            </p>

            <div className="relative mt-6 w-full max-w-lg mx-auto flex justify-center">
                <Image
                    src="/stage2_apriltag.jpg"
                    alt="Duckiebot Setup"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">Fig 2.1 Apriltag placed near a red intersection</p>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Detecting Apriltags</h3>
                <p className="mt-2">
                Our bot continues to lane follow, but based on the ID of the detected apriltag placed on a red intersection, turns left or right.
                <br /><br />
                <span className="font-medium text-amber-400">Our solution:</span> We utilized the <code className="bg-gray-800 px-2 py-1 rounded text-sm">dt_apriltags</code> python library and used its <code className="bg-gray-800 px-2 py-1 rounded text-sm">Detector</code> class to identify apriltags of the &quot;tag36h11&quot; family <br/>
                We would attempt to detect an apriltag on every image callback (i.e. the bot subscribes to the camera feed and processes the image in the image callback function at 10 frames per second). If an apriltag is detected, it is saved as the <b>last_seen_apriltag</b> <br/>
                Then at the red intersection, based on the last seen apriltag and its ID, we determine which direction to turn. Deadreckoning is used to turn the bot in the correct detection based on the known road dimensions after which lane following resumes.
                </p>
            </div>

            <p className="mt-4">The end condition for stage 2 is when the bot has stopped at 2 red intersections since the beginning of stage 2 (we know beforehand that there are only 2 apriltags in stage 2, each placed at a red intersection with no red intersections between these 2 tags)</p>
            </section>

            <section className="mt-4">
            <h2 className="text-2xl font-semibold mt-6">Stage 3: Obstacle Avoidance</h2>
            <p>The bot continues to lane follow around Duckietown after stage 2 has ended and now for stage 3 must safely navigate the road avoiding obstacles.</p>

            <div className="relative mt-6 w-full max-w-lg mx-auto flex justify-center">
                <Image
                    src="/stage3.jpg"
                    alt="Duckiebot Setup"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">Fig 3.1 Two Crosswalks with potential pedestrians (ducks) crossing and a broken bot on the road between these crosswalks</p>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Waiting at Crosswalks</h3>
                <p className="mt-2">
                Crosswalks are determined by two blue strips separated by a small gap. Between these gaps can be ducks crossing. These ducks have a darker yellow color compared to the lane, so they have their own HSV color range. <br/>
                Our bot must always stop at a crosswalk for a moment even if their are no peduckstrians crossing. If there are ducks crossing, our bot must keep waiting until the ducks have crossed (no longer there). 
                <br/>If the ducks are not there, then the bot continues driving past the crosswalk and resumes lane following.
                <br /><br />
                <span className="font-medium text-amber-400">Our solution:</span> Blue crosswalks were detected using regular contour detection and if detected, our bot would stop for a second. At the same time in our image callback, we attempt to detect ducks using contour detection for their particular colour.
                <br/>If ducks are detected, our bot continues to stay stationary (we publish a velocity of zero). If ducks are no longer detected, we wait for a cooldown period where we continue to look for ducks
                <br/>If no ducks were detected during the cooldown period, we resume lane following.
                </p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Maneuvering around a broken bot</h3>
                <p className="mt-2">
                In between the two crosswalks in stage 3 is a broken down bot that is also slightly yawed on the road. Our bot must detect this broken bot and stop. <br/>
                It must then switch lanes and drive past the bot without colliding with it. Then it must return to the original lane and continue lane following.
                <br /><br />
                <span className="font-medium text-amber-400">Our solution:</span> Since the broken bot is tilted, we cannot rely on detecting the circle pattern on its back. So we resorted to simply detecting its blue hue using contour detection. In order to not confuse the broken bot and a blue crosswalk, we kept count of the number of blue contours detected in stage 3. The second blue contour detected could only be the blue bot based on our logic and prior knowledge.
                <br/> Once the broken bot is detected, we stop for 5 seconds. We then use deadreckoning to rotate our bot counterclockwise by 90 degrees, drive straight for 0.4m, rotate clockwise by 90 degrees, drive straight for 1.5m, rotate clockwise by 90 degrees, drive for 0.4m, rotate counterclockwise by 90 degrees and resume lane following.
                <br/> <br/>This method of using deadreckoning (hardcoding kinematics) is a bit unreliable and needs quite a bit of tuning since our bot had poor wheel callibration and was very sensitive to the friction on road. A better solution would&apos;ve been to use deadreckoning to nudge the bot towards the opposite lane and then make it lane follow but with the lanes swapped for a small period of time before using a similar technique to make it go back to the original lane.
                </p>
            </div>
            </section>

            <section className="mt-4">
            <h2 className="text-2xl font-semibold mt-6">Stage 4: Park at a Parking Lot</h2>
            <p>Stage 3 ends when the second crosswalk has been passed (i.e. the third blue contour has been detected since stage 3 began)</p>
            <p>For stage 4, a parking lot is present in Duckietown with 4 spots. Each spot is a rectangle with yellow borders and an apriltag with a fixed unique ID centered at the short edge of the rectangle</p>

            <div className="relative mt-6 w-full max-w-lg mx-auto flex justify-center">
                <Image
                    src="/stage4.jpg"
                    alt="Duckiebot Setup"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">Fig 4.1 The parking lot with 4 spots</p>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-accent">Parking the bot</h3>
                <p className="mt-2">
                Our bot must stop at the red intersection before entering the parking lot. Our bot is given the the parking ID at the beginning of the course and is required to park and stop at the correct spot with the wheels inside the yellow borders.
                <br /><br />
                <span className="font-medium text-amber-400">Our solution:</span> Knowing the parking ID, we would know the position of the parking spot in the lot. We used deadreckoning to move the bot approximately close to the parking spot it needs to park at
                <br/>We then start rotating the bot in place slowly to look for the apriltag with the parking ID. Once the apriltag is detected, we draw a bounding box around it.
                <br/>We then used a proportional controller to move the bot closer to this apriltag&apos;s bounding box until it reaches a close enough distance to the box. 
                <br/>We use another proportional controller with higher priority to ensure that the bounding box is at the center of our bot&apos;s field of view (within a small threshold). This is to ensure that the bot is within the borders of the parking spot since we know that the april tag is centered on the rectangle.
                <br/><br/>Once our bot is close enough to the apriltag and the apriltag is appropriately centered in our bot&apos;s field of view. We know we have parked correctly and stop.
                <br/>
                <span className="text-amber-400">Note: </span> 5 extra points were awarded for reverse parking, but due to time constraints, we did not implement this.
                </p>
            </div>

            </section>

            <section className="mt-4">
            <h2 className="text-2xl font-semibold mt-6">Results</h2>
            <p>We were given 3 rounds to attempt the entire 4 stage course and the best round would be chosen as our final score.</p>
            <p>Each round was out of 125 points and any score obtained &gt;= 100 would be rewarded a 100% on the final project.</p>

            <h3 className="text-lg font-semibold text-accent mt-4">Round 1</h3>
            <p>We did pretty well this round up until stage 4. For some reason, after reaching the parking lot, it would just continue to lane follow and never attempt parking.</p>
            <p>Our bot also had some issues with lane following, where it went too close to the white lane on certain turns. </p>
            <p>Also, in stage 1, the leading bot was controlled using keyboard control. However, there was a delay between the keyboard input and the bot&apos;s movement and the leading bot was moving unreliably. This hindered our tailing at points where our bot could not see the back of the tailing bot and almost collided.</p>
            <p>The TA controlling the leading bot decided to switch to moving it physically with their hands for the subsequent rounds.</p>
            <p className="text-amber-400">We scored a 75/125 for round 1</p>

            <h3 className="text-lg font-semibold text-accent mt-4">Round 2</h3>
            <p>Round 2 was a repeat of round 1, but even worse. The same issue with the final stage happened again, our bot just did not even attempt to park.</p>
            <p>To make things worse, we had increased the gain values for our pd controller for lane following and this caused the bot to start oscillating at points during the first stage and it even detected and stopped for red intersections when it was not supposed to.</p>
            <p>Since our code reled on keeping track of the number of red stops to know which stage or which part of a stage we were at, this messed with its navigation</p>
            <p className="text-amber-400">We scored a 65/125 for round 2</p>

            <h3 className="text-lg font-semibold text-accent mt-4">Round 3</h3>
            <p>With only 1 more attempt at the course and our final grade on the line, we finally figured out the issue with the final stage. Turns out it was a single <b>if condition</b> that had to check for the number of red stops to know that we need to park now. This if condition needed to check that more than 5 red stops had been detected. Instead it was checking if exactly 5 stops had been detected. (Yes our code could have been more robust to prevent a situation like this from happening, but we were very short on time by this point)</p>
            <p>Changing this single condition made stage 4 be initiated. The downside was that this meant we only had one chance for our stage 4 to work</p>
            <p>After some final tuning for our pd controllers and small touchups, we built the program on our bot and gave it a go.</p>
            <p className="text-amber-400">We scored a 105/125 for round 3!! This secured us a full 100% for the final project.</p>
            <br/><p>We pretty much did perfectly on stages 1 and 2. For stage 3, we only messed up in the maneuvering around the broken bot once. In stage 4, our bot had to be picked up once because it got stuck when rotating and trying to look for the apriltag with the parking ID, but eventually found it and parked in the right spot.</p>
            <br/><p>Unfortunately, this was the only round that we did NOT take a video of and only the people present in the room got to witness it.</p>

            </section>

            <h2 className="text-2xl font-semibold mt-6">Final CMPUT412 Grade</h2>
            <div className="relative mt-6 w-full max-w-lg mx-auto flex justify-center">
                <Image
                    src="/cmput412_grade.png"
                    alt="Duckiebot Setup"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <p className="text-center text-xl text-accent mt-2">WE GOT AN A!</p>


        </div>
    );
    }