# Browsing capabilities: graphics, media, files, location data and notifications



A modern browser gives controlled access to a wide variety of tools and services. 
The website can draw graphics, play media, read from a file selected by the user, request location data or send notifications - but all this is limited by the browser's security model and the user's permission.



A web application opened in today's browser often offers capabilities that we previously only expected from installed programs. 
We can edit a picture, have a video conference, search for a position on a map, upload a file or receive a notification. 
These functions are not provided by a single "web magic", but by separate, standard browser APIs.


The most important principle is that the website does not get unlimited access to the computer. 
It cannot read the contents of the hard drive at will, it cannot automatically track the user's location, and it cannot send unlimited notifications. 
The browser acts as an intermediary: the page may request a certain capability, but the user and the browser's security rules decide on access.


### 2D canvas


`canvas` is an HTML element that provides a programmable drawing surface in the browser. 
Lines, shapes, images, text and diagrams can be drawn on it using JavaScript. 
It can be used for data visualization, simple games, image editing or signature recording.


The canvas differs from the interface built from traditional HTML elements. 
A paragraph or button is semantically present in the document; 
the text drawn on the canvas, on the other hand, is often just a set of pixels. 
Therefore, it is an important issue of accessibility that the canvas content has a text alternative, and that the function is not only accessible with a mouse.


### WebGL and complex graphics


Browser API using WebGL graphics hardware acceleration. 
It is suitable for creating three-dimensional models, maps, scientific visualizations and complex games. 
A WebGL map or product display may seem natural to the user, but in the background the browser may also use the graphics processor.


The potential for high performance does not mean that every interface needs WebGL. 
For a simple chart or content page, a complex graphic solution can slow down loading, consume more power, and be less accessible. 
The choice of technology must always be adapted to the user's purpose.


### Media and communication


HTML provides built-in audio and video elements for media playback. 
Modern browsers can also access cameras and microphones with appropriate permissions. 
A video conferencing application, for example, captures the camera image, encodes it, transmits it over a network, and then plays it back on the other side. 
The browser clearly indicates when a page is currently using the camera or microphone.


Auto-starting audio or video can be problematic for the user experience. 
Browsers therefore often limit automatic audio playback. 
This is a good example of how the browser not only fulfills the wishes of the page, but also protects the interests of the user.


### File Management APIs


A web page may allow a user to select and upload a file, such as a submission, photo, or spreadsheet. 
The point is the user's initiative: the browser does not allow a page to silently read through the computer's files. 
The content of the selected file can also be processed on the client side, for example, a preview of an image can be displayed before uploading.


Security and data protection responsibilities also arise here. 
The service must clearly state what file it is requesting, why it is requesting it, how long it will be stored and who will have access to it. 
File names, metadata or location data embedded in an image can also be personal or sensitive information.


### Location data


Using the Geolocation API, the website can request the approximate or exact location of the user. 
The browser may use GPS, Wi-Fi networks, cellular or IP-based estimation based on the capabilities of the device. 
For a map route planner or local event finder, this is a real convenience advantage.


Location data can be particularly sensitive personal data. 
A good service doesn't ask for location access on a "sure thing" basis, but when the function really needs it and clearly explains the purpose. 
The user can revoke the permission later in the browser settings.


### Notifications


Web notifications allow an application to notify you of something even when the user is not looking at that page. 
It can be useful, for example, for calendar reminders, messages or service status changes. 
However, too many or unreasonable notifications can quickly become annoying.


Therefore, the timing of the permission request is an important planning issue. 
It is not a good practice to ask for permission right away when the page is loaded, before the user understands why it is needed. 
The value must be shown first, and then the option to turn on notifications must be given when using the function.


## Worked example: application of a university field practice


Imagine a fieldwork application running in a browser. 
The student sees the location of the assignment on a map. 
After enabling location data, the app can show you how far you are from the designated point. 
The student selects a photo from their device, the page previews it, and then uploads it. 
The system can send a notification if the instructor has given feedback.


In this example, each ability has a clear purpose. 
However, the system must also provide an alternative: the location data can be entered manually, uploading the photo can be optional, and the notification can be turned off. 
The technical option cannot override the user's choice.


## Common misunderstandings


| 
Claim | 
Clarification |

| 
--- | 
--- |

| 
"A website can read my GPS location at any time." 
| 
The browser usually binds access to explicit user permission. 
|

| 
"The canvas is automatically barrier-free." 
| 
Often a separate text and keyboard alternative must be designed for drawn content. 
|

| 
"The file upload is just a technical detail." 
| 
It also has privacy, security and storage implications. 
|

| 
“Notifications always increase engagement.” 
| 
A notification that is too frequent is annoying and the user can disable it altogether. 
|


## Review questions


1. Why is it important that the browser asks for permission to use location data?

2. What is the difference between canvas and semantic HTML content?

3. Why can't a site read files on a computer at will?

4. When is it reasonable to request a notification from a user?


## Glossary


- **Browser API:** standard programming interface for browser capabilities.

- **Canvas:** programmable two-dimensional drawing surface.

- **WebGL:** web graphics technology using graphics hardware acceleration.

- **Geolocation:** browser capability for retrieving location data.

- **Permission:** the revocable access approval given by the user.
