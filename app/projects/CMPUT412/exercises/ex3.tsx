"use client";
import Image from 'next/image';

export default function Exercise3() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Exercise 3 - Computer Vision & Robotics</h1>
      <h3 className="text-xl text-silver mt-4">Sami Jagirdar [ccid: jagirdar]   <span className='text-accent'>|</span>    Basia Ofovwe [ccid: ofovwe]</h3>
      <p className="mt-4">Technologies used: <span className='text-accent'>Python, ROS, OpenCV, Duckietown</span> </p>

      <h2 className="text-2xl font-semibold mt-6">Part 1. Computer Vision</h2>
      <h3 className='mt-4 text-xl'>1.1. Camera Distortion</h3>

      <section className='mt-4'>
        <h3 className='text-l font-semibold text-accent'>Converting Distorted Images to Undistorted Images</h3>
        <p>Camera lenses introduce distortion to images, particularly at the edges, causing straight lines to appear curved. Undistorting images requires the camera&apos;s intrinsic parameters and distortion coefficients.</p>
        
        <p className="mt-2">The general process for undistorting images involves:</p>
        <ol className="list-decimal ml-6 mt-2 space-y-1">
          <li>Obtaining the camera&apos;s intrinsic matrix and distortion coefficients</li>
          <li>Computing an optimal new camera matrix to minimize information loss</li>
          <li>Creating undistortion mapping matrices</li>
          <li>Applying these maps to remap pixels from the distorted to undistorted image</li>
        </ol>
        
        <p className="mt-2">In our implementation, we used OpenCV with ROS on a Duckiebot with these key steps:</p>
        <ol className="list-decimal ml-6 mt-2 space-y-1">
          <li>Retrieved camera parameters from the ROS <code className="bg-gray-800 px-2 py-1 rounded text-sm">camera_info</code> topic</li>
          <li>Used <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.getOptimalNewCameraMatrix()</code> to calculate an optimal camera matrix</li>
          <li>Created mapping matrices once with <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.initUndistortRectifyMap()</code></li>
          <li>Applied the undistortion to each new image using <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.remap()</code></li>
          <li>Cropped the result using the region of interest (ROI) to remove black borders</li>
        </ol>
        
        <p className="mt-3">This method is more efficient than using <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.undistort()</code> for each frame, as the computational heavy lifting is done only once during initialization.</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <div className="flex-1">
            <Image
              src="/distorted.png"
              alt="Distorted Camera Image"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-400 mt-2">Fig 1.1a Distorted Camera Image</p>
          </div>
          <div className="flex-1">
            <Image
              src="/undistorted.png"
              alt="Undistorted Camera Image"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-400 mt-2">Fig 1.1b Undistorted Camera Image</p>
          </div>
        </div>
      </section>

      <h3 className='mt-6 text-xl'>1.2. Image Pre-processing</h3>
      <section className='mt-4'>
        <h3 className='text-l font-semibold text-accent'>Image Preparation for Processing</h3>
        <p>Before applying our main computer vision algorithms, we performed several pre-processing steps to optimize the images:</p>
        
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Resized the image from its original 640x480 resolution to half its size (320x240) to improve processing speed</li>
          <li>Cropped the top half of the image to focus only on the relevant road area</li>
          <li>Applied a Gaussian blur using OpenCV&apos;s <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.GaussianBlur()</code> function to reduce noise and detail</li>
        </ul>
        
        <p className="mt-3">These pre-processing steps significantly improved the performance of our subsequent computer vision operations by reducing computational load and focusing only on the relevant portions of the image. We are able to run our nodes at a frequency of 20 frames/second. </p>
      </section>

      <h3 className='mt-6 text-xl'>1.3. Color Detection</h3>
      <section className='mt-4'>
        <h3 className='text-l font-semibold text-accent'>Line and Color Detection</h3>
        <p>We implemented a robust color detection system to identify colored lane lines on the road. The process involved several key steps:</p>
        
        <h4 className="mt-4 font-medium text-accent">How to detect lines and colors?</h4>
        <ol className="list-decimal ml-6 mt-2 space-y-1">
          <li>First, we captured sample images of red, green, and blue lane lines using the Duckiebot&apos;s camera</li>
          <li>We created a custom HSV calibration tool with sliders to precisely determine optimal HSV ranges for each color</li>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <div className="flex-1">
              <Image
                src="/red_mask.png"
                alt="Red Color Mask"
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
              />
              <p className="text-center text-sm text-gray-400 mt-2">Fig 1.3a Red Color Mask</p>
            </div>
            <div className="flex-1">
              <Image
                src="/green_mask.png"
                alt="Green Color Mask"
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
              />
              <p className="text-center text-sm text-gray-400 mt-2">Fig 1.3b Green Color Mask</p>
            </div>
            <div className="flex-1">
              <Image
                src="/blue_mask.png"
                alt="Blue Color Mask"
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
              />
              <p className="text-center text-sm text-gray-400 mt-2">Fig 1.3c Blue Color Mask</p>
            </div>
          </div>
          <li>Converted camera frames from BGR to HSV color space using <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.cvtColor()</code></li>
          <li>Applied color masking with <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.inRange()</code> using our calibrated HSV thresholds</li>
          <li>Enhanced detection reliability by applying dilation to fill gaps in the masks</li>
          <li>Found and filtered contours using <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.findContours()</code> and area thresholding</li>
        </ol>

        <h4 className="mt-4 font-medium text-accent">How contour detection works</h4>
        <p>Contour detection is a crucial step that identifies the boundaries of objects in binary images:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>After creating a binary mask with our HSV color filtering, contour detection identifies connected regions in this mask</li>
          <li>The <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.findContours()</code> function traces the boundaries of white areas in the binary mask</li>
          <li>Each contour is represented as a sequence of points defining the object&apos;s outline</li>
          <li>We used <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.RETR_TREE</code> to retrieve all contours in a hierarchical structure</li>
          <li>The <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.CHAIN_APPROX_SIMPLE</code> parameter reduces memory usage by storing only endpoint coordinates</li>
          <li>We then filtered contours by area (&gt;300 pixels) to eliminate noise and focus on substantial lane markings</li>
        </ul>
        
        <h4 className="mt-4 font-medium text-accent">How to get lane dimensions?</h4>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Used <code className="bg-gray-800 px-2 py-1 rounded text-sm">cv2.boundingRect()</code> to extract bounding box coordinates (x, y, width, height) around detected contours</li>
          <li>Stored these dimensions in a structured data format for each detected color lane</li>
          <li>Visualized dimensions by drawing rectangles around detected lanes and annotating with size information</li>
        </ul>
        
        <h4 className="mt-4 font-medium text-accent">How to develop a robust line and color detection algorithm?</h4>
        <p>Our robust color detection approach incorporated several key principles:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><strong>Precise calibration:</strong> Using our custom HSV calibration tool to fine-tune color ranges for our specific lighting conditions</li>
          <li><strong>Noise reduction:</strong> Applying appropriate pre-processing and filtering incorrect detections by area threshold along with dilation</li>
          <li><strong>Anticipating the environment in which colors are detected:</strong>Since our Duckiebot is on the ground, cropping the top half to not detect any colors above the road was an important strategy</li>
          <li><strong>Choosing the right contour:</strong> Sometimes, multiple contours can be detected in close proximity, we choose the largest contour</li>
        </ul>
        
        <p className="mt-3">This approach enabled reliable detection of colored lane lines, providing critical input for the upcoming navigation system.</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <div className="flex-1">
            <Image
              src="/red_detection.png"
              alt="Red Lane Detection"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-400 mt-2">Fig 1.3d Red Lane Detection with bounding boxes and dimensions</p>
          </div>
          <div className="flex-1">
            <Image
              src="/green_detection.png"
              alt="Green Lane Detection"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-400 mt-2">Fig 1.3e Green Lane Detection with bounding boxes and dimensions</p>
          </div>
          <div className="flex-1">
            <Image
              src="/blue_detection.png"
              alt="Blue Lane Detection"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-400 mt-2">Fig 1.3f Blue Lane Detection with bounding boxes and dimensions</p>
          </div>
        </div>
      </section>

      <h3 className='mt-6 text-xl'>1.4. LED Control & Autonomous Navigation</h3>
      <section className='mt-4'>
        <h3 className='text-l font-semibold text-accent'>Integration of Vision and Control</h3>
        <p>We implemented a unified approach to autonomous navigation and LED control based on the visual lane detection:</p>
        
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Created a dedicated navigation node to handle both movement commands and LED signaling</li>
          <li>Used the detection results from our color detection system to inform navigation decisions</li>
          <li>Implemented LED control to provide visual feedback about the currently detected lane</li>
          <li>Published Twist2D movement commands directly to the <code className="bg-gray-800 px-2 py-1 rounded text-sm">car_cmd_switch_node/cmd</code> topic</li>
          <li>Controlled the robot by setting linear velocity (v) and angular velocity (omega) parameters</li>
          <li>This approach differed from Exercise 2 by directly manipulating chassis movement rather than using wheel ticks</li>
        </ul>
      </section>

      <h3 className='mt-6 text-xl'>1.5. Lane-Based Behavioral Execution</h3>
      <section className='mt-4'>
        <h3 className='text-l font-semibold text-accent'>Color-Specific Behaviors & Distance Estimation</h3>
        <p>We successfully implemented the required behaviors for each colored lane (blue: stopping, signaling right, and turning 90° right; red: stopping and driving straight; green: stopping, signaling left, and turning 90° left).</p>
        
        <p className="mt-3">A key innovation in our implementation was using the Duckiebot&apos;s extrinsic calibration parameters to accurately determine the distance to each lane:</p>
        
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Used the homography matrix from the bot&apos;s calibration to project pixel coordinates to ground coordinates</li>
          <li>Specifically, mapped the bottom center point of each lane&apos;s bounding box to its real-world ground distance</li>
          <li>This approach enabled precise distance-based behaviors, allowing the bot to reliably stop at the required 30cm distance from each lane</li>
          <li>Computed the ground projection using the following transformation:</li>
        </ul>
        
        <pre className="bg-gray-800 p-2 mt-2 rounded overflow-x-auto text-sm mx-6">
          <code>
          ground_point = H @ image_point  # Where H is the homography matrix <br/>
          # X,Y coordinates in ground frame <br/>
          ground_x, ground_y = ground_point[0], ground_point[1] 
          </code>
        </pre>

        <h4 className="mt-4 font-medium text-accent">ROS Service Implementation</h4>
        <p>To enable modular and on-demand execution of color-specific behaviors, we implemented a ROS service architecture:</p>
        
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Created a custom service in the lane detection node with the navigation node as the client</li>
          <li>This allowed us to trigger different color behaviors separately and on demand</li>
          <li>The service provided a comprehensive understanding of ROS service/client patterns</li>
        </ul>
        
        <div className="flex justify-center mt-3">
          <pre className="bg-gray-800 p-2 rounded text-xs w-64">
            <code>
# LaneInfo.srv <br/>
# Request <br/>
int8 RED=1 <br/>
int8 GREEN=2<br/>
int8 BLUE=3<br/>
int8 color<br/>
---<br/>
# Response<br/>
bool detected<br/>
int32 x<br/>
int32 y<br/>
int32 width<br/>
int32 height<br/>
int32 area<br/>
float32 distance<br/>
            </code>
          </pre>
        </div>
        
        <p className="mt-3">By combining accurate distance estimation with our color detection system, the Duckiebot could reliably execute the appropriate behavior for each lane color while maintaining precise positioning relative to the lanes.</p>

        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/iM-WsrEbhBc"
            title="Red Line Behavior"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 1.5a: Duckiebot approaches the red line from 30cm distance, stops for 3-5 seconds, then proceeds straight ahead for at least 30cm</p>
        
        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/uZjo2vidhwA"
            title="Green Line Behavior"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 1.5b: Duckiebot approaches the green line from 30cm distance, stops for 3-5 seconds, signals using left LEDs, then turns 90 degrees to the left</p>
        
        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/0euupLSnxjE"
            title="Blue Line Behavior"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 1.5c: Duckiebot approaches the blue line from 30cm distance, stops for 3-5 seconds, signals using right LEDs, then turns 90 degrees to the right</p>

        <h4 className="mt-4 font-medium text-accent">Integration and Optimization Considerations</h4>
        <p>Throughout the development of this project, we identified several key insights regarding system integration:</p>
        
        <h5 className="mt-3 ml-3 font-medium text-accent">How to integrate computer vision, LED control, and wheel movement nodes?</h5>
        <ul className="list-disc ml-8 mt-1 space-y-1">
          <li>Using ROS services or topics to establish clear communication between detection and control nodes</li>
          <li>Ensuring consistent coordinate frames between vision data and control commands</li>
          <li>Centralizing behavior logic in the navigation node with color detection as a service</li>
          <li>Alternatively, we could make the color detection node a publisher that publishes lane results like distance and dimensions to a topic to which navigation node subscribes to</li>
        </ul>
        
        {/* <h5 className="mt-3 ml-3 font-medium text-accent">How to improve this integration?</h5>
        <ul className="list-disc ml-8 mt-1 space-y-1">
          <li>Adding basic error recovery for lost lane detection</li>
          <li>Creating launch files for easier startup of the entire system</li>
          <li>Implementing simple parameter files to adjust detection thresholds without code changes</li>
        </ul> */}
        
        <h5 className="mt-3 ml-3 font-medium text-accent">How to optimize integration and handle delays?</h5>
        <ul className="list-disc ml-8 mt-1 space-y-1">
          <li>Reducing image resolution for faster processing</li>
          <li>Processing only regions of interest rather than the entire image</li>
          <li>Adding simple smoothing filters to control commands to reduce jitter</li>
        </ul>
        
        <h5 className="mt-3 ml-3 font-medium text-accent">How does camera frequency and control update rate impact performance?</h5>
        <ul className="list-disc ml-8 mt-1 space-y-1">
          <li>In our implementation, both rates were set to 20Hz which worked well for our application</li>
          <li>Matching rates helped maintain system stability during transitions between behaviors</li>
          <li>This frequency provided sufficient responsiveness while staying within processing capabilities</li>
        </ul>
      </section>      

      <h2 className="text-2xl font-semibold mt-6">Part 2. Controllers</h2>
      <section className='mt-4'>
        <h3 className='text-l font-semibold text-accent'>Lane Following with Control Systems</h3>
        <p>This section explores different control strategies for enabling autonomous lane following in the Duckiebot.</p>
        
        <h4 className="mt-4 text-l font-medium text-accent">Lane Detection Implementation</h4>
        <p>Building on our approach from Part 1, we implemented lane detection for yellow dotted center lines and white solid outer lines:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Applied similar HSV color filtering techniques to isolate yellow and white lanes</li>
          <li>Used ground projection via homography to convert detected lane positions to real-world distances</li>
          <li>Published detection results to a custom ROS topic using our own message format</li>
          <li>Enabled the lane controller node to subscribe to these lane positions for feedback control</li>
        </ul>

        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/xrj0c3f8whg"
            title="P Controller Lane Following"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.1: Duckiebot following lane for 1.5m using P controller</p>
        
        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/KOXMJxS5900"
            title="PD Controller Lane Following"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.2: Duckiebot following lane for 1.5m using PD controller with reduced oscillation</p>
        
        <div className="relative mt-6 w-full max-w-lg mx-auto display: flex justify-center items-center">
          <iframe
            width="800"
            height="450"
            src="https://youtube.com/embed/HKBLwoSnZPU"
            title="PID Controller Lane Following"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Fig 2.3: Duckiebot following lane for 1.5m using PID controller with improved stability</p>
        
        <h4 className="mt-4 text-l font-medium text-accent">Control System Implementation</h4>
        <p>Our error calculation approach focused on maintaining the Duckiebot in the center of the lane:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>When both lanes were detected, error was calculated as the addition of distances (yellow lane +y, white lane -y)</li>
          <li>For balanced positioning, the net error should be zero (equidistant from both lanes)</li>
          <li>When only one lane was detected, we adjusted the error to maintain approximately 10cm from that lane</li>
          <li>This error value directly influenced the angular velocity (omega) for steering control</li>
          <li>After tuning, we settled on gains of: <code className="bg-gray-800 px-2 py-1 rounded text-sm">Kp = 30, Kd = 0.7, Ki = 0.1</code></li>
        </ul>
        
        <h4 className="mt-4 text-l font-medium text-accent">Comparison of Controller Types</h4>
        <p className="font-medium">What are the pros and cons of P, PD, and PID controllers?</p>
        
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-600 text-left">Controller</th>
                <th className="px-4 py-2 border-b border-gray-600 text-left">Pros</th>
                <th className="px-4 py-2 border-b border-gray-600 text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-600 font-medium">P (Proportional)</td>
                <td className="px-4 py-2 border-b border-gray-600">
                  <ul className="list-disc ml-4">
                    <li>Simple to implement</li>
                    <li>Intuitive parameter tuning</li>
                    <li>Fast initial response</li>
                  </ul>
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  <ul className="list-disc ml-4">
                    <li>Steady-state error</li>
                    <li>Oscillations at high gains</li>
                    <li>Cannot anticipate future errors</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-600 font-medium">PD (Proportional-Derivative)</td>
                <td className="px-4 py-2 border-b border-gray-600">
                  <ul className="list-disc ml-4">
                    <li>Reduces oscillations</li>
                    <li>Faster settling time</li>
                    <li>Anticipates error changes</li>
                  </ul>
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  <ul className="list-disc ml-4">
                    <li>Still has steady-state error</li>
                    <li>Sensitive to noise</li>
                    <li>More complex tuning</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-600 font-medium">PID (Proportional-Integral-Derivative)</td>
                <td className="px-4 py-2 border-b border-gray-600">
                  <ul className="list-disc ml-4">
                    <li>Eliminates steady-state error</li>
                    <li>Robust to disturbances</li>
                    <li>Complete control solution</li>
                  </ul>
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  <ul className="list-disc ml-4">
                    <li>Most complex to tune</li>
                    <li>Risk of integral windup</li>
                    <li>Potential overshoot</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="mt-4 font-medium text-accent">What is the error calculation method for your controller?</p>
        <p className="mt-2">Our error calculation used the ground-projected distances to the lanes:</p>
        <pre className="bg-gray-800 p-2 rounded text-sm mt-2 mx-6">
          <code>
# When both lanes detected: <br/>
error = yellow_lane_distance + white_lane_distance<br/>
# When only yellow lane detected:<br/>
error = yellow_lane_distance - desired_distance (10cm)<br/>
# When only white lane detected:<br/>
error = white_lane_distance - desired_distance (-10cm)<br/>
          </code>
        </pre>
        <p className="mt-2">This approach provided a signed error value that represented the robot&apos;s deviation from the lane center, where zero indicated perfect centering between lanes.
          <br/>The control output (p/pd/pid) is obtained as a function of this error and directly assigned to the angular velocity, omega.
        </p>
        
        <p className="mt-4 font-medium text-accent">How does the derivative (&quot;D&quot;) term in the PD controller impact control logic? Is it beneficial?</p>
        <p className="mt-2">In theory, the derivative term helps dampen oscillations and provides faster response to changing errors. In our implementation:</p>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          <li>We expected the D term to significantly reduce oscillations</li>
          <li>While we did observe some dampening effect, the difference wasn&apos;t as dramatic as anticipated</li>
          <li>Spolier alert: The D term is actually crucial for curved paths and our values for part 3 changed quite a bit</li>
          <li>For our short 1.5m test track, the improvements were definitely present though</li>
        </ul>
        
        <p className="mt-4 font-medium text-accent">How does the integral (&quot;I&quot;) term in the PID controller affect performance? Was it useful for your robot?</p>
        <p className="mt-2">The integral term had mixed effects on our system:</p>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          <li>We kept the integral gain very small (Ki = 0.1) after testing</li>
          <li>Higher values consistently caused noticeable overshooting</li>
          <li>The small value helped address minor systematic biases</li>
          <li>Overall, this term had the smallest impact on our controller&apos;s performance</li>
        </ul>

        <p className="mt-4 font-medium text-accent">What methods can be used to tune the controller&apos;s parameters effectively?</p>
        <p className="mt-2">We used a combination of approaches to tune our PID parameters:</p>
        <ol className="list-decimal ml-6 mt-1 space-y-1">
          <li>Started with manual tuning: implemented P control first (took the most time), then added D, and finally I</li>
          <li>Used iterative testing: made small adjustments based on observed performance</li>
          <li>We later realized we could have applied the Ziegler-Nichols method: identified the ultimate gain where oscillations began, then calculated initial parameters. We will keep it in mind for next time</li>
          <li>It was taking a long time for us to set rebuild the bot for each gain value. We managed to find an alternative starting dts-gui-tools which provided a docker container where we copied our catkin package to. We ran catkin build on it and were able to run the package simply using the rosrun command while passing the gain values as command line arguments. (see alt_lane_following_controller.py in our repo) </li>
        </ol>
        <p className="mt-2">The final parameters (Kp = 30, Kd = 0.7, Ki = 0.1) provided a good balance between responsive steering and stable lane following across the 1.5-meter test distance.</p>
      </section>

      <h2 className="text-2xl font-semibold mt-6">Part 3. Lane Following</h2>
      <section className='mt-4'>
        <h3 className='text-l font-semibold text-accent'>Autonomous Oval Track Navigation</h3>
        <p>For the final part of the exercise, we attempted to use our lane detection and control system to navigate an oval track.</p>
        <p>Unfortunately, despite our best efforts, we weren&apos;t able to come up with a system that could follow the oval lane due to a fair bit of challenges that we could honestly write an entire separate report on. As soon as we thought we solved one challenge, another would arise.</p>
        <p>I will try to summarize the things we tried and the challenges we faced as best as I can</p>
        <p>while the bot could follow a straight lane properly, it was at turns that it really stuggled. We started with our normal gain values and trying to stay in the center of the yellow and white lanes, but at turns the bot would not turn until the very last moment and the amount of rotation would be huge</p>
        <p>It turned out that since we were doing the lane following in a different room, the white lane was brighter and the bot was not detecting it properly. We had to extend the HSV range</p>
        <p>We even accounted for when only one of either the yellow or white lanes are seen and adjust how our bot moves accordingly since this would be a common occurrence during turns</p>
        <p>We had many different ideas for this scenario and trying them all out with the bot&apos; limited battery life tooke extremely long</p>
        <p>The best idea we came up with was assuming a default/dummy white lane at -0.15m from the bot if only a yellow lane is detected and similarly, assume a dummy yellow lane at a fixed distance if only the white lane is detected</p>
        <p>We then tried 30+ combinations of PID gain values and none of them seemed to work. Some actually came close but would eventually go to close to one lane suddenly make the bot irregular</p>
        
        <p>We even tried just following the yellow lane and encountered pretty much the same issue with the turns</p>
        <p>To make development faster we even made it so that we could provide pid gain values as command line arguments. Normally we can't pass command line arguments to nodes since they run in a container on the bot. But we leveraged dt-gui-tools which provides a runtime container where we can run ROS nodes individually.
          So we copied our catkin package directly to this container while it's running, ran catkin build followed by source setup/bash.sh commands and were able to run the subscriber nodes using rosrun.
          <br/>While this helped speed stuff up, we did have an issue with delay and latency (discussed next), so we went back to regular building and running using devel build and devel run.
        </p>
        <p>Up until the moment of us writing this report, we believe that the major issue is with a combination of the omega values published to the bot being unreliable and there delay between what the bot is currently seeing through its camera and its actual position </p>
        <p>I would screen record each attempt of the bot&apos;s lane follow and print out omega (angular velocity) values both from the node that is publishing the lane detection results and the node that is subscribing to the lane detected distances to control omega.</p>
        <p>We noticed a clear delay between the distances published by the lane_detection node and the distances received by the lane_following node at the same time instance</p>
        <p>We managed to fix this issue by realizing that we were building and running the containers remotely. We also realized that the white and yellow lanes were being published at slightly different times in the lane-detection node, meaning our subscriber was getting mismatched distances for a particular time instance</p>
        <p>We solved both these issues by building our package on the bot directly and publishing both yellow and white lane results at the same time in the same message</p>
        <p>Just when we thought all our issues were solved, and the bot was moving properly at least for the first 25-30% of the lane, it would suddenly start veering off track and when we noticed the rqt_image_view footage from recording our screens, we noticed that the longer the subscriber (lane_following) node ran the more the lane_detection node started lagging</p>
        <p>This was a veryy weird situation. Before it was the lane-following node that lagged and it made sense, but now running the lane-following node was making the publisher lag and the lag increased the longer the subscriber node (lane following node) ran</p>
        <p>At this point we had spent over 25 hours on just this part alone and asked many other groups about their implementation as well. We couldn't really find our mistake</p>
        <p>My biggest suspicion right now is how the publisher-subscribers are set up and if we had more time, I would simply do both the detection and the control in a single node. This is what we will attempt to do for our exercise 4. Perhaps this delay had always existed but wasn't noticeable in the straight line tasks</p>
        <p>We would also just go back to using pixel distances instead of ground distance though I believe this should not make a difference as our ground distances seemed to be pretty accurate when we compared them with our own physical measurements of the lane distances</p>
        <p>Beyond all this, I guess the only thing we can try is to probably redo everything from scratch to see if we missed anything and probably tune our gains better.</p>
        </section>


      {/* References section directly in the Exercise3 component */}
      <h2 className="text-2xl font-semibold mt-6">References and Acknowledgments</h2>
      <p className='mt-4'>The following resources were used in the completion of this exercise:</p>
      <ul className='list-disc ml-6'>
        <li><a href="https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html" className="text-blue hover:underline">OpenCV Documentation on Camera Calibration and Undistortion: </a></li>
        <li> <a href="https://www.geeksforgeeks.org/multiple-color-detection-in-real-time-using-python-opencv" className="text-blue hover:underline">Color Detection:</a> </li>
        <li><a href="https://people.ece.cornell.edu/land/courses/ece4760/FinalProjects/s2012/fas57_nyp7/Site/pidcontroller.html" className="text-blue hover:underline">PID controller information and pros and cons: </a></li>
        <li>ChatGPT also helped explain some of the concepts. It helped provide the HSV slider code and helped with setting up ros services. <br/>It also helped prepare this writeup due to time constraints</li>
      </ul>

      <p className="mt-4">
        We would like to acknowledge the LI <span className="text-accent">Adam Parker</span> and the TAs 
        <span className="text-accent"> Dikshant, Jasper</span> and <span className="text-accent">Monta </span> 
        for their assistance with explaining computer vision concepts and being very accomodative during this exercise.
      </p>
    </div>
  );
}