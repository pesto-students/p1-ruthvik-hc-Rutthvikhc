# Assignment 1.1
## _Browser_

The main function of the browser is to retrieve information from the World Wide Web and making it available for users. Visiting any website can be done by entering a URL (Uniform Resource locator). 
When we enter an URL, the browser contacts DNS Server(Domain Name System) which translates each URL to an IP address, then Using this IP address the browser can make the request to the actual server where this IP address is present and get all the source codes required to generate the webpage.

## _The browser's high level Components_
**1) The user interface** - This includes the address bar, back/forward button, bookmarking menu, etc. Every part of the browser display except the window where you see the requested page.
**2) The browser engine** - marshals actions between the UI and the rendering engine.
**3) The rendering engine** - responsible for displaying requested content. For example if the requested content is HTML, the rendering engine parses HTML and CSS, and displays the parsed content on the screen.
**4) Networking** - for network calls such as HTTP requests, using different implementations for different platform behind a platform-independent interface.
**5) UI backend** - : used for drawing basic widgets like combo boxes and windows. This backend exposes a generic interface that is not platform specific. Underneath it uses operating system user interface methods.
**6) JavaScript interpreter** - . Used to parse and execute JavaScript code.
**7) Data storage** - This is a persistence layer. The browser may need to save all sorts of data locally, such as cookies. Browsers also support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem.
![This is an image](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/layers.png)

## _Document Object Model (DOM)_
- When the browser reads HTML code, whenever it encounters an HTML element like html, body, div etc., it creates a JavaScript object called a Node. Eventually, all HTML elements will be converted to JavaScript objects.
- After the browser has created Nodes from the HTML document, it creates a tree-like structure of these node objects. This will help the browser efficiently render and manage the webpage throughout its lifecycle.
![DOM Tree Model](https://miro.medium.com/max/780/1*YSA8lCfCVPn3d6GWAVokrA.png)

## _CSS Object Model (CSSOM)_
- After constructing the DOM, the browser reads CSS from all the sources (external, embedded, inline, user-agent, etc.) and construct a CSSOM which is a Tree Like structure just like DOM.
- Each node in this tree contains CSS style information that will be applied to DOM elements that it target. CSSOM, however, does not contain DOM elements which can’t be printed on the screen like <meta>, <script>, <title> etc.
![CSSOM Tree Model](https://miro.medium.com/max/780/1*YSA8lCfCVPn3d6GWAVokrA.png)

## _Render Tree_
- Render-Tree is also a tree-like structure constructed by combining DOM and CSSOM trees together. 
- When a web page is loaded, the browser first reads the HTML text and constructs DOM Tree from it. Then it processes the CSS whether that is inline, embedded, or external CSS and constructs the CSSOM Tree from it.
![CSSOM Tree Model](https://miro.medium.com/max/1050/1*8HnhiojSoPaJAWkruPhDwA.png)

## _Layout, Painting and Compositing operation_
- The browser creates the layout of each individual Render-Tree node. The layout consists of the size of each node in pixels and position on the screen. This process is called layout since the browser is calculating the layout information of each node.
- Since elements (or a sub-tree) in the Render-Tree can overlap each other and they can have CSS properties that make them frequently change the look, position, or geometry (such as animations), the browser creates a layer for it.
- Creating layers helps the browser efficiently perform painting operations throughout the lifecycle of a web page such as while scrolling or resizing the browser window. Having layers also help the browser correctly draw elements in the stacking order  as they were intended by the developer.
- Each layer is drawn separately first. Inside each layer, the browser fills the individual pixels for whatever visible property the element has. This process is also called as rasterization.
- To increase performance, the browser may use different threads to perform **rasterization**.
- In **compositing operations**, the layer is broken down into different **tiles** which then will be drawn on the screen.
-![CSSOM Tree Model](https://miro.medium.com/max/1050/1*yQJkz12sPxS-kJoMDqzbEQ.png)

## _Parsing_
- Parsing is the process of reading HTML content and constructing a DOM tree from it. Hence the process is also called **DOM parsing** and the program that does that is called the **DOM parser**.
- When the browser request for a webpage and server responds with some HTML text, a browser may start **parsing** the HTML as soon as a few characters or lines of the entire document are available. Hence the browser can build the DOM tree incrementally, one node at a time. The browser parses HTML from top to bottom.
- Whenever the browser encounters an external resource such as a **script** file (JavaScript) via *<script src="url"></script>* element, a stylesheet file (CSS) via *<link rel="stylesheet" href="url"/>* tag, an image file via *<img src="url" />* element or any other external resource, the browser will start the download of that file in the background (away from the main thread of the JavaScript execution).
- If the main JavaScript execution thread is busy, DOM parsing will not progress until the thread is free. Because script elements are **parser-blocking**. Every external file requests such as image, stylesheet, pdf, video, etc. do not block DOM construction (parsing) except script (.js) file requests.

## _Parser-Blocking Scripts_
- A **parser-blocking script** is a script (JavaScript) file/code that stops the parsing of the HTML. 
- If browser encounters a **embedded script**, then it will execute that script first and then continue parsing the HTML to construct the DOM tree. So all **embedded script**s are **parser-blocking**.
- If the script element is an **external script** file, the browser will start the download of the external script file off the **main thread** but it will halt the execution of the main thread until that file is downloaded. Once the script file is downloaded, the browser will first execute the downloaded script file on the main thread and then continue with the DOM parsing.
- However, halting **DOM parsing** while the script file is being downloaded in the background is totally unnecessary in most cases. Hence **HTML5** gives us the ***async*** and ***defe***r attributes for the script tag.
- All ***async*** scripts (AKA asynchronous scripts) do not block parser until they are downloaded. As soon as an async **script** is downloaded, it becomes **parser-blocking**. However, all ***defer scripts*** (AKA deferred scripts) are **non-parser-blocking script** as they do not block the parser and execute after the DOM tree is fully constructed.


