"use client";
import Image from 'next/image';

export default function Exercise1() {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold">Exercise 1 - Duckiebot Operation Basics</h2>
      <p>This exercise involved learning the basic skills and knowledge required to operate a Duckiebot.</p>
      <p className="mt-4">Technologies used: <span className='text-accent'>Python, DuckieTown Shell, Docker</span> </p>

      <h3 className="text-xl font-semibold mt-6">1. Duckiebot Setup</h3>
      <p className="mt-2">
        The first step was to set up the Duckiebot. We were provided an assembled Duckiebot with a burned SD card. 
        Our Duckiebot is named <span className="text-accent">csc22926</span>, but we needed to install the required software dependencies to connect to the robot and operate it.
      </p>
      <p className="mt-4">
        This involved installing <strong>Docker</strong>, <strong>Duckietown Shell (dts)</strong>, and creating a <strong>Duckietown account</strong>.
      </p>

      <h4 className="text-lg font-medium mt-6">Discovering the Duckiebot</h4>
      <p className="mt-2">
        Next, we turned on the Duckiebot and ensured we could discover it on the network using the <code className="bg-gray-800 px-2 py-1 rounded text-sm">dts fleet discover</code> command.
      </p>
      <p className="mt-2">
        We were able to see our Duckiebot&apos;s name <span className="text-accent">csc22926</span> in the list of discovered Duckiebots.
      </p>

      <p className="mt-4">Our Duckiebot was now ready to be operated!</p>

      <div className="relative mt-6 w-full max-w-lg mx-auto">
        <Image
          src="/CMPUT412.jpg"
          alt="Duckiebot Setup"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
      </div>
      <p className="text-center text-sm text-gray-400 mt-2">Fig 1.1 Duckiebot CSC22926</p>

      <h2 className="text-xl font-semibold mt-8">2. Duckiebot Operation</h2>
      <p className="mt-2">
        Before we began moving the robot, we first logged into the Duckietown dashboard at 
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">csc22926.local</code> using our Duckietown account token.
      </p>

      <h3 className="text-lg font-medium mt-6">Controlling the Duckiebot</h3>
      <p className="mt-2">
        We then used the following command to connect to the Duckiebot over WiFi and control it using our keyboard:
      </p>
      <p className="mt-2">
        <code className="bg-gray-800 px-2 py-1 rounded text-sm block w-fit">dts duckiebot keyboard_control csc22926</code>
      </p>
      <p className="mt-2">
        On the dashboard, we were able to see its camera feed and motor signals as it moved.
      </p>

      <div className="relative mt-6 w-full max-w-lg mx-auto">
        <Image
          src="/CMPUT412_ex1.png"
          alt="Duckietown Dashboard"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.1 Duckietown Dashboard</p>
      </div>

      <h3 className="text-lg font-medium mt-6">Explanation of Fig 2.1</h3>
      <p className="mt-2">
        The image contains the motor speed, linear speed, and angular speed. At the time of taking the screenshot,  
        we had just started driving the bot in a straight line at full power, hence the high linear speed and zero angular speed.
      </p>
      <p className="mt-2">
        We can also see the Duckiebot&apos;s camera POV. I hope <span className="text-accent">csc22926</span> had a nice view of me...
      </p>

      <h2 className="text-2xl font-bold mt-8">3. Duckiebot Intrinsic Calibration</h2>
      <p className="mt-4">
        The Duckiebot camera&apos;s POV is not necessarily an accurate representation of the world from an outside reference.  
        It may distort the image and have an inaccurate pixel projection. Intrinsic calibration focuses on the camera&apos;s internal characteristics and how it forms images. 
        It accounts for the camera&apos;s lens distortion, focal length, and sensor properties. The calibration process generates parameters that help correct image distortions and ensure accurate pixel measurements, 
        which is crucial for the robot to perceive distances and shapes correctly.
      </p>
      <p className="mt-4">
        We next performed intrinsic calibration by using a fixed size and rigid checkerboard as a reference and using the following command:
        <code className="bg-accent/10 p-2 rounded text-accent">dts duckiebot calibrate_intrinsics csc22926</code>
        <br/>We then moved the Duckiebot camera around the checkerboard in different axes to perform the calibration. Finally, we generated the intrinsic calibration parameters required to correct the camera&apos;s POV.
      </p>

      <div className="relative mt-6 w-full max-w-lg mx-auto">
        <Image
          src="/CMPUT412_ex1_intrinsic_params.png"
          alt="Intrinsic Calibration Parameters"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
        <p className="text-center text-sm text-gray-400 mt-2">Fig 3.1 Intrinsic Calibration Parameters</p>
      </div>

      <h3 className="text-lg font-medium mt-6">Explanation of Fig 3.1</h3>
      <p className="mt-2">
        Images are essentially matrices, and the robot is receiving an input matrix from its camera. The .yaml file contains parameters that are used in various matrix operations to correct the input matrix to represent an accurate view of the world. 
      </p>
      <p className="mt-2">
        For example, the <code className="bg-accent/10 p-2 rounded text-accent">projection_matrix</code> describes how 3D points are projected onto the 2D image plane, and the <code className="bg-accent/10 p-2 rounded text-accent">rectification_matrix</code> accounts for correcting camera tilt.
      </p>

      <h2 className="text-2xl font-bold mt-8">4. Duckiebot Extrinsic Calibration</h2>
      <p className="mt-4">
        Extrinsic calibration deals with the camera&apos;s position and orientation relative to the Duckiebot&apos;s environment (like the ground plane). 
        It determines how to transform between the camera&apos;s view and real-world coordinates. This is essential for the robot to understand where it is in space and navigate accurately in Duckietown.
      </p>
      <p className="mt-4">
        So, we performed extrinsic calibration next, which involved placing the Duckiebot at the right position and the right angle with respect to the calibration checkerboard. 
        Then we performed the calibration using the following command:
        <code className="bg-accent/10 p-2 rounded text-accent">dts duckiebot calibrate_extrinsics csc22926</code>
        <br/> The required extrinsic calibration parameters were generated.
      </p>

      <div className="relative mt-6 w-full max-w-lg mx-auto">
        <Image
          src="/CMPUT412_ex1_extrinsic_params.png"
          alt="Extrinsic Calibration Parameters"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
        <p className="text-center text-sm text-gray-400 mt-2">Fig 4.1 Extrinsic Calibration Parameters</p>
      </div>

      <h3 className="text-lg font-medium mt-6">Explanation of Fig 4.1</h3>
      <p className="mt-2">
        The homography parameters, yet again, represent a transformation matrix that helps the robot understand its position relative to the ground. 
        It basically maps where the ground is in the camera&apos;s point of view (POV).
      </p>

      <h2 className="text-2xl font-bold mt-8">5. Duckiebot Wheels Calibration</h2>
      <p className="mt-4">
        The last bit of calibration has to do with the kinematics of Duckiebot. Even slight differences in the left and right motors, wheel sizes, etc. can prevent the bot from moving in a straight line.
        To ensure that it moves in a straight line, we performed a trim calibration.
        Trim acts as a bias correction between the right and left wheels. If the robot veers left, a positive trim adds more power to the left wheel to mitigate rotation towards the left side. A negative trim works similarly for the right wheel.
      </p>

      <p className="mt-4">
        Duckietown has many tools it uses to move the Duckiebot and analyze its motion.
        To use these tools, we run the following command:
        <code className="bg-accent/10 p-2 rounded text-accent">dts start_gui_tools csc22926</code>
      </p>

      <p className="mt-4">
        Then, we used ROS to modify data related to motion. In our case, it was to set the trim parameter to 0.01 using the following command:
        <code className="bg-accent/10 p-2 rounded text-accent">rosparam set /csc22926/kinematics_node/trim 0.01</code>
        We then saved the kinematics calibration settings.
      </p>

      <div className="relative mt-6 w-full max-w-lg mx-auto">
        <Image
          src="/CMPUT412_ex1_kinematics_calibration_params.png"
          alt="Wheel Calibration Parameters"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
        <p className="text-center text-sm text-gray-400 mt-2">Fig 5.1 Kinematics Calibration Parameters</p>
      </div>

      <h3 className="text-lg font-medium mt-6">Explanation of Fig 5.1</h3>
      <p className="mt-2">
        These represent the parameters used by ROS to manipulate how the Duckiebot moves. We can see the trim value of 0.01. We also notice parameters like <code className="bg-accent/10 p-2 rounded text-accent">omega_max</code> (max angular speed) and <code className="bg-accent/10 p-2 rounded text-accent">v_max</code> (max linear speed).
      </p>

      <p className="mt-4">
        We were now able to move the Duckiebot in a near straight line.
      </p>

      <div className= "mt-6">
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/Iy8P9iYBFjc"
          title="Straight line motion"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
        <p className="text-center text-sm text-gray-400 mt-2">Video 5.1: Straight line motion</p>
      </div>

      <h3 className="text-lg font-medium mt-6">Explanation of Video 5.1</h3>
      <p className="mt-2">
        The Duckiebot was initially steering to the left, so we added a positive 0.01 trim and we can see in the video that it moves nearly in a straight line. It starts veering to the right slightly at the end, but factors like road material, the tape, and slight calibration errors can cause this.
      </p>

      <p className="mt-4">
        We then made the Duckiebot move in a rectangular lane.
        Again, we ran the keyboard control command and pressed <code>a</code> to start lane following.
      </p>

      <div className="mt-6">
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/wl_25OYTh-M"
          title="Duckiebot Lane Following"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 5.2: Duckiebot Lane Following</p>
      </div>

      <h3 className="text-lg font-medium mt-6">Explanation of Video 5.2</h3>
      <p className="mt-2">
        As you can see, the Duckiebot moves around the lane detecting the white tape (lane borders) using its sensors. 
        The Duckiebot uses computer vision to detect lane markings and stay within the boundaries. It relies on a set of sensors to track the lane&apos;s edges, adjust its speed, and make decisions at corners. The left turn at intersections is part of its path-following algorithm for safe navigation.
      </p>
      <p className="mt-2">
        For now, we used the default configuration and algorithms built into the Duckiebot to perform this demonstration.
      </p>


      <div className="p-6 text-white">
      <h2 className="text-2xl font-bold">6: Duckiebot Programming Basics</h2>
      <p>
        We learned the basics of making a program that runs on the Duckiebot.
        First, we cloned a Duckietown development template repository. We modified the Dockerfile and wrote a simple Hello World program in Python. 
        Then we built the container image for the program and loaded it onto the Duckiebot. Afterward, we ran the program on the Duckiebot.
      </p>

      <div className="mt-6">
        <Image
          src="/CMPUT412ex1-Hello_from_csc22926.png"
          alt="Duckiebot csc22926 says Hello!"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
        <p className="text-center text-sm text-gray-400 mt-2">Fig 6.1: Duckiebot csc22926 says Hello!</p>
      </div>

      <h3 className="text-lg font-medium mt-6">Explanation of Fig 6.1</h3>
      <p className="mt-2">
        The program runs on the Duckiebot, and our program specifically used an environment variable that would contain the name of the Duckiebot,
        which is not hardcoded anywhere in our program. Only the Duckiebot would know the name stored in the environment variable. 
        The program correctly retrieves the name and prints: <code>Hello from csc22926!</code>.
      </p>
    </div>

    <h2 className="text-2xl font-bold">Exercise 7 - Lessons and Challenges</h2>
      <p>
        Through this exercise, I learned a lot about how Duckietown works, particularly in terms of Docker&apos;s role when programming robots. 
        I also learned the importance of calibration and how crucial it is to ensure the robot moves correctly before deploying any algorithms to perform specific tasks.
      </p>

      <h3 className="text-xl font-semibold mt-6">Challenges</h3>
      <p className="mt-2">
        One of the biggest challenges was patience! Sometimes getting a response from the robot could take a while, especially during the calibration process.
        The calibration itself was a time-consuming process where I had to move the robot around several times before it could generate appropriate calibration parameters.
        Another challenge was with adjusting the trim value for straight-line motion. Initially, I used too large values, but after experimenting, I settled on a trim value of 0.01.
      </p>
      
      <p className="mt-4">
        I also faced challenges with installing Ubuntu, which led me to ultimately use the desktop in the lab to perform all my tasks.

        Overall, I had a lot of fun and I have so much to learn. I look forward to the next exercises!
      </p>

    </div>
  );
}
