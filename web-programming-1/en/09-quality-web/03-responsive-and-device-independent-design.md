# Responsiveness and device independence

## Goals

By the end of the material, the student should understand that responsive web design is not a few mobile CSS rules, but the consideration of the changing display, input, network and usage situation. Learn the basics of flexible layout, breakpoint, viewport, content priority, and progressive development.

We do not create a "desktop" and "mobile" web, but content and an interface that can fulfill its purpose on a variety of displays, input methods and conditions. Good responsiveness starts from the user's task, not from a list of devices.

## Why isn't there a single normal screen?

Today, a website can be used on a 27-inch monitor, a narrow phone, a zoomed browser window, a landscape tablet, a TV, or a screen reader. The user can rotate the phone, open the tab in split screen or set the zoom to 200%. Even for the same phone model, available space may differ due to browser interface, split view or font size setting.

Therefore, device independence does not mean that the view is the same every pixel. It means that basic information and tasks are available in all relevant situations. On a restaurant's website, for example, the address, opening hours and reservation may be the primary priority on mobile; a wide screen can comfortably accommodate several photos and detailed stories. The goal is not to "dumb down" the smaller screen, but to consciously manage the order of importance.

## The viewport and flexible space

The viewport is the area of the browser in which the web page is displayed. Responsive sites do not assume that this is always a pre-fixed width. Flexible layout can work with percentage, `fr`, `minmax()` or other relative units to adapt to available space. CSS Flexbox and Grid are tools with which the distribution of boxes is not based on rigid, hand-calculated coordinates.

In the rigid approach, all three columns of a three-column page have a fixed width. On a narrow screen, this will result in horizontal scrolling, compressed text, or cropped content. In the flexible approach, the columns have a desired and minimum size, and then, where there is not enough space, they are arranged below each other. The decision is not justified by the phone model itself, but by the readability of the content.

## Breakpoints: the content breaks, not the device

A media query allows a different layout to take effect for a certain available width or user setting. These limits are called breakpoints. Wrong question: "how wide is the iPhone?". A better question: "at what width are these three columns no longer comfortably readable, or when does the navigation fit?"

This difference gives a more permanent solution. New devices are always coming, but the fact that a card needs a certain minimum width does not change. A breakpoint could be where the navigation would break into several lines, a table would become unintelligible, or the main operation would disappear during the fold.

## Mobile-first and content-first thinking

In the mobile-first approach, the basic style is prepared for a smaller, simpler situation, and then added to a larger place. This does not mean that the phone is the more important user, but that we force ourselves to choose the essentials first. If a function only fits on a giant display, the question must be asked: is it really indispensable or should it be reorganized?

Content-first is an even deeper principle. First, we plan the order of the content and the task, and only then the boxes. For example, for a job offer, the position name, location, application deadline and application option should be quickly available. It is not worth occupying the first screen with a huge decorative image if the user actually wants to know if the application is still open.

## Images, typography and touch targetsA responsive image is not simply a scaled-down image. A high-resolution photo on a phone can unnecessarily slow down loading when the mobile network is limited. The browser should receive a resource of the correct size and format where this can be handled. It is important that the ratio of the image is maintained, that the important detail is not cut off in the wrong place, and that the content report remains accessible in an alternative text.

Typography also adapts. Too long lines on a wide monitor are tiring; font that is too small is unreadable on the phone. Good readability is not only a matter of font size: line spacing, contrast, paragraph division and line length also matter. The user's own magnification must be respected; the page should not break when someone asks for a larger font.

There is no mouse pointer on the touch screen, and an imprecise finger requires a larger target surface. Using a small row of icons crowded together is frustrating. Important controls should be sufficiently large, separated from each other and clearly labeled. At the same time, do not assume that the mobile phone is only touch-sensitive: a keyboard or auxiliary input device can also be connected to the phone.

## Device independent interaction

A hover state can be useful visual feedback, but it shouldn't be the only way to access a piece of content or functionality. There is no permanent pointing on a touch screen, and focus is the right match for a keyboard. There should also be an alternative to the "drag here" task, for example reordering with buttons. Gestures can be quick, but you shouldn't rely solely on them.

The same applies to orientation. There is rarely a reason for a feature to be usable only in landscape or portrait mode. If a complex data visualization really requires more space, we should provide clear information, but the rest of the content should still be accessible.

## Performance as an inclusive issue

Responsiveness is not just layout. On fast office Wi-Fi and a new laptop, it's barely noticeable when a page loads dozens of large images, external fonts, and tracking codes. On a slow mobile network or a cheaper device, this may seem like minutes. A slow site is not actually an accessible site for those with low data frames, weak connections, or less powerful devices.

Therefore, the content priority is also a performance decision. The main information and the main action should be loaded first. Decorative, under-screen, or rarely needed items may arrive later. According to the principle of gradual development, the basic experience works with simple, standard functions, and more advanced capabilities improve, but do not exclusively enable use.

## Worked example: rearranging a university event page

Let's imagine an event page in desktop view: the program on the left, a large speaker photo in the middle, and the application box on the right. The three columns cannot remain in a narrow place. Based on the content priority, the address, time, location and the "Apply" button are displayed first. Then follows the short description and the program; the speaker photo and related news later. The button is visible in full width, in an easy-to-touch size, but it is also available with a keyboard. The navigation may shrink, but all menu items are still accessible, they are not only displayed on hover.

The three-column layout can return on a large screen, because it helps the overview there. We did not create two separate websites, but planned the meaningful appearance of the same information in several spaces.

## Common misconceptions

**"Responsive = mobile friendly."** Mobile is an important case, but the task is broader than that: variable size, zoom, input and network.

**"Two breaking points are enough: phone and desktop."** Content can break or become crowded even at intermediate widths. Choose the breakpoints based on the specific layout.

**"We only hide the difficult parts on mobile."** If the hidden part is needed to complete the task, it should be available in a different form. Less cannot mean a loss of information.

**"The hover menu is modern, so it's good."** Not everyone can reach it with hover alone; both keyboard and touch operation are required.

## Review questions1. Why is it not advisable to link breakpoints to device models?
2. What does the content-first approach mean for an event page?
3. How does slow loading relate to device independence?
4. Why can a function that only appears on hover be a problem?
5. Name two variables that should be considered for a web interface in addition to screen width.

## Glossary

**Responsive web design:** a design and implementation that adapts the layout and interaction to the available conditions.

**Viewport:** the display area available for the page in the browser.

**Breakpoint:** the condition or size at which the layout is consciously changed.

**Mobile-first:** a basic solution based on a smaller screen that expands in a larger space.

**Content priority:** conscious management of the order of importance of content and operations.

**Progressive development:** Gradual capacity expansion based on stable basic experience.
