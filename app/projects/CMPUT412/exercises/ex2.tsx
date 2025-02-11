"use client";
import Image from 'next/image';

export default function Exercise2() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Exercise 2 - ROS Development & Kinematics</h1>
      <h3 className="text-xl text-silver mt-4">Sami Jagirdar [ccid: jagirdar]   <span className='text-accent'>|</span>    Basia Ofovwe [ccid: ofovwe]</h3>
      <p className='mt-4'>In this exercise, we explored the fundamentals of ROS and developed ROS-based software for DuckieTown using a Duckiebot. We performed some basic ROS operations including some basic OpenCV image processing. <br/>
        The main task involved utilizing the Duckiebot’s odometry (differential drive) and applying kinematic equations to control its movement along predefined trajectories and analyzing its motion. <br/>
        Additionally, we created an LED service to control the LED lights on the Duckiebot depending on its state during its motion.</p>
      <p className="mt-4">Technologies used: <span className='text-accent'>Python, ROS, OpenCV</span> </p>

      <h2 className="text-2xl font-semibold mt-6">Part 1. ROS Basics</h2>
      <h3 className='mt-4 text-xl'>1.1. ROS Core Concepts</h3>

        <section className='mt-4'>
            <h3 className='text-l font-semibold text-accent'>Node</h3>
            <p>A ROS node is an independent process that performs a specific task, such as reading sensors or controlling motors.</p>
            <p>Nodes communicate via topics, services, and actions, enabling modular system design.</p>
            <b>Example:</b> A camera node captures images, while another node processes the image data.
        </section>
        <section className='mt-4'>
            <h3 className='text-l font-semibold text-accent'>Topic</h3>
            <p>A ROS topic is a communication channel where nodes exchange messages asynchronously in a publish-subscribe manner.</p>
            <p>Used for continuous data streams like sensor readings and control commands.</p>
            <b>Example:</b> A camera node publishes images to the <code className="bg-gray-800 px-2 py-1 rounded text-sm">/camera/image_raw</code> topic, and an analysis node subscribes.
        </section>
        <section className='mt-4'>
            <h3 className='text-l font-semibold text-accent'>Service</h3>
            <p>A ROS service enables synchronous request-response communication between nodes.</p>
            <p>Used for on-demand operations like retrieving system status or resetting sensors.</p>
            <b>Example:</b> <code className="bg-gray-800 px-2 py-1 rounded text-sm">/get_temperature</code > service returns the current temperature.
        </section>
        <section className='mt-4'>
            <h3 className='text-l font-semibold text-accent'>Message</h3>
            <p>A ROS message is a structured data format used for exchanging information between nodes.</p>
            <p>Messages are defined in <code className="bg-gray-800 px-2 py-1 rounded text-sm">.msg</code> files and contain headers and fields like numbers, strings, or nested structures.</p>
            <b>Example: </b>The <code className="bg-gray-800 px-2 py-1 rounded text-sm">/wheels_driver_node/wheels_cmd</code> topic uses <code className="bg-gray-800 px-2 py-1 rounded text-sm">duckietown_msgs.WheelsCmdStamped</code> type that has <code className="bg-gray-800 px-2 py-1 rounded text-sm">vel_left</code> & <code className="bg-gray-800 px-2 py-1 rounded text-sm">vel_right</code> fields to control the throttle of each wheel.
        </section>
        <section className='mt-4'>
            <h3 className='text-l font-semibold text-accent'>Bag</h3>
            <p>A ROS bag is a file format for recording and replaying ROS messages, useful for debugging and analysis.</p>
            <p>Recorded data can be replayed or plotted to analyze the expected behaviour of the robot</p>
            <b>Example:</b> <code className="bg-gray-800 px-2 py-1 rounded text-sm">rosbag record</code> is used to capture robot’s sensor readings are recorded in a <code className="bg-gray-800 px-2 py-1 rounded text-sm">.bag</code> file for offline debugging. <code className="bg-gray-800 px-2 py-1 rounded text-sm">rosbag play</code> can be used to play the recorded data to simulate real time operation
        </section>

        <h3 className='mt-6 text-xl'>1.2. Using ROS with Duckiebots</h3>
        <p className='mt-4'>Duckiebots are ROS-based robots that use ROS nodes to control their movement, sensors, and other functionalities. The Duckiebot software stack is designed to work with ROS, making it easy to develop and test algorithms for autonomous driving.</p>
        <p className='mt-4'>To use ROS with Duckiebots we setup the <a 
              href="https://docs.duckietown.com/daffy/devmanual-software/beginner/ros/create-project.html" 
              className="text-blue-400 hover:underline"
            >
              DTROS
            </a> interface using the DTProject template repository that also allows us to create <span className="text-accent">catkin packages</span> that can be built into docker images and ran in containers on the duckiebot </p>

        <p className='mt-4'>We then wrote our first publisher and subscriber nodes. The publisher node sends a &quot;Hello...&quot; message to a custom topic called <code className="bg-gray-800 px-2 py-1 rounded text-sm">/chatter</code></p>
        <p>The subscriber node subscribes to the aforementioned topic and reads the data being published</p>

        <div className="relative mt-6 w-full max-w-3xl mx-auto flex justify-center">
            <Image
                    src="/ex2p1_2-publisher.png"
                    alt="/chatter Topic Info"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                    />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
                Fig 1.1 Custom ROS Topic <code className="bg-gray-800 px-2 py-1 rounded text-sm">/chatter</code> Info.
                The publisher node sends <span className='text-accent'>&apos;Hello from ROBOTNAME&apos;</span> messages to this topic
        </p>

        <div className="relative mt-6 w-full mx-auto flex gap-4 justify-center">
                <Image
                src="/ex2p1.2-subscriber-node-info.png"
                alt="Subscriber Node Info"
                width={450}
                height={300}
                className="rounded-lg shadow-lg"
                />
                <Image
                src="/ex2p1.2-subscriber-output.PNG"
                alt="Subscriber Output"
                width={450}
                height={300}
                className="rounded-lg shadow-lg"
                />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
                Fig 1.2 Subscriber Node Info showing it has subscribed to the <code className="bg-gray-800 px-2 py-1 rounded text-sm">/chatter</code> topic. It also shows that the publisher node is connected to the topic.
                <br/> Fig 1.3 Subscriber Node Output showing the messages received from the publisher node
        </p>

        <h3 className='mt-6 text-xl'>1.3. Using OpenCV in ROS and Basic Image Processing</h3>
        <p className='mt-4'>Next, we created a node that subscribes to the <code className="bg-gray-800 px-2 py-1 rounded text-sm">/csc22926/camera_node/image/compressed</code> topic. Then using OpenCV, grayscales this image and annotates it. </p>
        <p>The modified image is published to a custom topic <code className="bg-gray-800 px-2 py-1 rounded text-sm">/csc22926/camera_node/annotated_image/compressed</code></p>
        <div className="relative mt-6 w-full max-w-3xl mx-auto flex justify-center">
            <Image
                    src="/ex2p1-annotated-image-rqt.png"
                    alt="/Annoted Image rqt-viewer"
                    width={600}
                    height={800}
                    className="rounded-lg shadow-lg"
                    />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
                Fig 1.4 Annotated & Grayscaled Image in rqt-viewer which is started using the <code className="bg-gray-800 px-2 py-1 rounded text-sm">rqt_image_view</code> command. rqt viewer allows use to view <code className="bg-gray-800 px-2 py-1 rounded text-sm">CompressedImage</code> type data from the <code className="bg-gray-800 px-2 py-1 rounded text-sm">/csc22926/camera_node/annotated_image/compressed</code> topic.
                The annotation includes the ROBOT NAME and the size of the image.
        </p>

      <h2 className="text-2xl font-semibold mt-6">Part 2. Odometry Using Wheel Encoders</h2>
        <h3 className='mt-4 text-xl'>2.1. Odometry Background</h3>
        <p className='mt-4'>Odometry is the use of data from motion sensors to estimate change in position over time. In differential drive robots like Duckiebots, odometry is calculated using wheel encoders that measure wheel rotation.</p>
        <p>Particularly, the wheel encoders measure the incremental ticks rotated by each wheel since being turned on. For the DT series bots, the total ticks per revolution, <span className='text-accent'>N_TOTAL_TICKS = 135</span>. Also, the wheel radius, <span className='text-accent'>WHEEL_RADIUS = 0.0318m</span> and distance between the center of wheels, <span className='text-accent'>WHEELBASE = 0.09m</span></p> 
        <p>Therefore, we can derive the total distance travelled by each wheel as:</p>
        <p> (1) <span className='text-accent'>DISTANCE = (2 * π * WHEEL_RADIUS * ticks) / N_TOTAL_TICKS</span></p>
        <p className='mt-4'>The angle rotated by the bot can be calculated based on the distance travelled by each wheel for some time period</p>
        <p> (2) <span className='text-accent'>θ = (ARC_DISTANCE_RIGHT - ARC_DISTANCE_LEFT) / WHEELBASE</span></p>
        <p className='text-sm'>* Arc distance is essentially distance travelled by wheel</p>

        <p className='mt-4'>We can read the ticks by subscribing to the <code className="bg-gray-800 px-2 py-1 rounded text-sm">/csc22926/left_wheel_encoder_node/tick</code> and <code className="bg-gray-800 px-2 py-1 rounded text-sm">/csc22926/right_wheel_encoder_node/tick</code> topics</p>
        <p>We can also provide velocity to each of the wheels by publishing the throttle for each wheel to the <code className="bg-gray-800 px-2 py-1 rounded text-sm">/csc22926/wheels_driver_node/wheels_cmd</code> topic</p>

        <h3 className='mt-6 text-xl'>2.2. Straight Line Task</h3>
        <p className='mt-4'>Using the information above, our first task was to make the duckiebot move 1.25m in a straight line forward and then in reverse along the same path.</p>

        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/JOI1PE31nmg"
            title="Duckiebot Straight Line Task"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.1: <span className='text-accent'>csc22926</span> travels autonomously in a straight line for 1.25m forwards and backwards</p>

        <section className='mt-4'>
            <h3 className='text-l text-accent'>Why is there a difference between the actual and desired location?</h3>
            <p>There are several reasons for the difference between the actual and desired location:</p>
            <ul className='list-disc ml-6'>
                <li>Wheel slippage: The wheels may slip on the surface, causing the robot to move less than expected. Our equations are based on the constraint that the bot is undergoing perfect rolling, but this is not realistic</li>
                <li>Wheel alignment: The wheels may not be perfectly aligned or incorrectly callibrated (one wheel receives more power than the other), causing the robot to veer off course.</li>
                <li>Wheel Radius: The distance travelled measurement depends on the wheel radius as well which has to be measured manually or via an experiment. An inaccurate measurement can lead to incorrect calculation of actual distance travelled.</li>
            </ul>
            <p>Because of these reasons, even though our program detects that the wheels have rotated enough ticks to cover our desired distance, the actual distance covered by the robot can differ. In our case, the bot travelled a distance slightly less than 1.25m as expected.</p>
        </section>

        <section className='mt-4'>
            <h3 className='text-l text-accent'>What speed did we use?</h3>
            <p>We used a speed of 0.3 (i.e a throttle of 0.3) for both wheels for the forward and reverse motion. </p>
        </section>

        <section className='mt-4'>
            <h3 className='text-l text-accent'>What happens when we increase or decrease the speed?</h3>
            <p>Increasing the speed would make it more likely for the robot to slip and not cover the full distance, whereas a slower speed may see the robot wheels not having enough torque to rotate on the mat surface as the friction may be too strong. Note that the speed we provide is essentially the throttle, so there are forces and torques involved</p>
        </section>

        <h3 className='mt-6 text-xl'>2.3. Rotation Task</h3>
        <p className='mt-4'>Next, we made the duckiebot rotate 90 degrees clockwise and then 90 degrees counterclockwise.</p>

        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/dgfw90tV9Lo"
            title="Duckiebot Rotation Task"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.2: <span className='text-accent'>csc22926</span> autonomously rotates 90 degree clockwise and then 90 degree counter-clockwise on the spot</p>

        <section className='mt-4'>
            <h3 className='text-l text-accent'>Did we observe any deviations in the rotation?</h3>
            <p>Yes, we noticed that the bot rotated slightly more than 90 degrees, despite our calculations being ideal for a 90 degree rotation</p>
        </section>

        <section className='mt-4'>
            <h3 className='text-l text-accent'>If deviations exist, what could be the cause</h3>
            <p>There are several reasons for the deviation:</p>
            <ul className='list-disc ml-6'>
                <li>Wheel slippage: Similar to the straight line task, the wheels can slip during rotation. Normally, this would make the robot undershoot the 90 degree mark, but we must also consider horizontal sliding which can make it rotate not due to the wheel rotation but because of slipping tangential to the direction of rotation</li>
                <li>The equation for angle rotated depends on the length of the wheelbase of the duckiebot. In our experiment, it was measured manually with a ruler. If the measurement is inaccurate, i.e. greater than the actual length of the wheelbase, then based on equation (2), the wheels would rotate more than required</li>
                <li>The subscriber to the ticks is reading it at a particular rate. It is possible that in its read cycles, it reads the ticks a few moments after the bot has already rotated 90 degrees. So it realizes this and stops the bot from rotating a little too lates</li>
            </ul>
        </section>

        <section className='mt-4'>
            <h3 className='text-l text-accent'>Does our program shutdown after finishing the above tasks?</h3>
            <p>Yes, our terminates and shuts down after executing the above tasks. This is further evidenced by the fact that running the <code className="bg-gray-800 px-2 py-1 rounded text-sm">docker ps</code> command and seeing that our launched program does not exist.</p>
            <p>Potential reasons for why it may not shutdown is that the ros nodes could still be active after our particular task is ended, especially with ros commands like spin() which keep subscriber nodes alive even after it reaches the end of the python script to keep listening to messages and that the ros shutdown() command isn&apos;t called. 
            In our code, we don&apos;t have a call to <code className="bg-gray-800 px-2 py-1 rounded text-sm">rospy.spin() </code>(unless required for the purposes of a subscriber node), we also have a break statement in our while loop whose condition is to check if <code className="bg-gray-800 px-2 py-1 rounded text-sm">rospy.is_shutdown() </code> is true or not. After exiting the while loop, in our main function, we call <code className="bg-gray-800 px-2 py-1 rounded text-sm">rospy.signal_shutdown() </code> as well, ensuring that the ROS master terminates all nodes. </p>
        </section>

        <h3 className='mt-6 text-xl'>2.4. Plotting Trajectory</h3>
        <p className='mt-4'>The velocity (throttle) messages we publish to the <code className="bg-gray-800 px-2 py-1 rounded text-sm">/csc22926/wheels_driver_node/wheels_cmd</code> topic along with the timestamps at which we publish them can be used to determine the change in x and y position of the robot in the world frame of reference </p>
        <p>The velocity information is recorded into a bag file using the <code className="bg-gray-800 px-2 py-1 rounded text-sm">rosbag record topic -o filename.bag</code> command</p>
        <p>We then load the bag file contents in a python script and apply the following kinematics equations to get our x and y positions of the robot in the world frame at each timestamp</p>
        <p> (3) <span className='text-accent'>Δx_robot = (v_left + v_right) / 2 * Δt * SCALING_FACTOR</span></p>
        <p> (4) <span className='text-accent'>Δy_robot = 0</span></p>
        <p> (5) <span className='text-accent'>Δθ_robot = (v_right - v_left) / WHEELBASE * Δt * SCALING_FACTOR</span></p><br/>
        <p> (6) <span className='text-accent'>Δx_world = Δx_robot * cos(θ) - Δy_robot * sin(θ)</span></p>
        <p> (7) <span className='text-accent'>Δy_world = Δx_robot * sin(θ) + Δy_robot * cos(θ)</span></p>
        <p> (8) <span className='text-accent'>x_world = x_world + Δx_world</span></p>
        <p> (9) <span className='text-accent'>y_world = y_world + Δy_world</span></p>
        <p> (10) <span className='text-accent'>θ = θ + Δθ_robot</span></p><br/>
        <p>Where <span className='text-accent'>SCALING_FACTOR = 7.5</span> is used to scale the throttle to the actual velocity of the robot and we start with initial values of (x_world, y_world,θ) = (0,0, π/2). </p>
        <p>Note that the published velocities are not in exact units of m/s like how WHEELBASE and Δt are. These are just very small values [-1,1] that are <b>proportional</b> to the actual velocities of the wheels. Therefore, we made an educated guess on the proportionality constant and multiplied the throttles with this constant (SCALING_FACTOR) to get an accurate measurement of Δθ_robot and Δx_robot</p>

        <p className='mt-4'>We then plot the trajectory of the robot in the world frame using the matplotlib library</p>
        <div className="relative mt-6 w-full max-w-3xl mx-auto flex justify-center">
            <Image
                    src="/straight_line.gif"
                    alt="Straight Line Trajectory Plot"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.3: Trajectory of the straight line task according to <span className='text-accent'>csc22926</span>. (not necessarily the same as actual path travelled)</p>
        <p className='mt-2 text-sm'>* the axes say that x and y are in m, this is not necessarily correct and was a typo. For them to be meters, the SCALING_FACTOR would have to be exactly the correct value to convert between throttle and velocity in m/s</p>
        <div className="relative mt-6 w-full max-w-3xl mx-auto flex justify-center">
            <Image
                    src="/rotate.gif"
                    alt="Rotation Trajectory Plot"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.3: Trajectory of the 90 degree rotation task according to <span className='text-accent'>csc22926</span> (not necessarily the same as actual path travelled). As expected, the position of the bot does not change</p>

        <h2 className="text-2xl font-semibold mt-6">Part 3. The Will of D</h2>
        <p className='mt-4'>Our final task for this project was to use the wheel encoders for odometry to make the Duckiebot follow &apos;D&apos;-shaped path. Along the way, we impleted an LED light service to indicate and represent different states of the bots motion</p>
        
        <h3 className='mt-6 text-xl'>3.1. Node 1: Moving the Duckiebot in D-shaped path</h3>
        <div className="relative mt-6 w-full max-w-3xl mx-auto flex justify-center">
            <Image
                    src="/D_trajectory.jpg"
                    alt="D-shaped Trajectory"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 3.1: The path that the Duckiebot must follow starting at the bottom left</p>

        <p className='mt-4'>To make the Duckiebot follow the D-shaped path, we had to calculate the distance and angle the bot must travel to reach each point on the path. We then used the odometry equations to move the bot to each point.</p>
        <p>The logic for the straight line and 90 degree on the spot rotation parts of this task were already handled in Part 2.</p>
        <p>We now had to handle the logic for the two curved edges of the path</p>
        <p>Our calculations are derived from equations (1) and (2) yet again. The angle covered is 90 degrees, but the right and left wheels also cover a finite distance. The right wheel covers a smaller distance than the left wheel due to the radius of its arc length being lesser than the left wheel by the length of the <span className='text-accent'>WHEELBASE</span></p>
        <p>However, both wheels cover their respective distances in the same time. This means that the ratio of their velocities equals the ratio of their distances covered</p>
        <p>Δt_left = Δt_right --&gt; d_left / v_left = d_right / v_right --&gt; v_left = (d_left / d_right ) * v_right</p>
        <p>d_left and d_right are calculated using the formula <span className='text-accent'>d = r * θ</span> where r is the arc radius and θ is π/2 radians</p>
        <p>We assume a reasonable value for v_right and calculate the corresponding value for v_left. Using these values, we apply the same logic as the rotation task to make the bot move in the path of the curved edge</p>

        <h3 className='mt-6 text-xl'>3.2. Node 2: State Management and LED Service</h3>
        <p className='mt-4'>We created an LED service that changes the color of the LED lights on the Duckiebot based on its state</p>
        <p>Node 1 would publish the current state of the robot to a custom topic <code>/led_state</code></p>

        
        
    </div>
  );
}
