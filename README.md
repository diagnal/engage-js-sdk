[![N|Solid](http://i.imgur.com/iz9YsTS.png)](https://diagnal.com)
# Engage JavaScript SDK #

Engage is real-time targeted marketing campaigns that drive user acquisition and conversion.
It promotes content to users and access customer sentiment.

Engage JavaScript SDK allows easy integration of Engage to you web application in a few steps.

## Get Started
Include the Engage JS library file in your HTML head element and initialize the SDK with your credentials.
```html
<script type="text/javascript" src="https://cdn.engage.diagnal.com/engage-core.js"></script>
<script>
ENGAGE.initialize(ACCOUNT_ID, PROJECT_ID, OPTIONS);
</script>
```
### Options

| Field           | Type                    | Description
| --------------- | ----------------------- | -------------
| `modules`       | Data collection modules | gtm, know
| --------------- | ----------------------- | -------------
| `VapidKey`      | Vapid Public Key        | Vapid Key for Web Push Support

### Example

```javascript
ENGAGE.initialize("8asdf643-f645-4dfb-a2se-sdfa33ac9f9e", "Ha45dfb9g", {
          modules: ['gtm'],
          VapidKey : 'BKCr4OrrMwVQz06amYXI-_EAcvZ3pt0Yb3NVJ2sAQPyFDbb-MCUMKJZp7aoOELi6QDTq57tBwMJZEdrH9go3dtE'
      });
```

## Usage

### Identify User

The `identify` method is how you associate your users and their actions to a recognizable `userId` and `traits`.

```javascript
ENGAGE.identify([userId], [traits]);
```

The `identify` call has the following fields:

| Field                     | Type                    | Description
| ------------------------- | ----------------------- | -------------
| `userId` (Optional)       | String                  | The unique ID for the user.
| `traits` (Optional)       | Object                  | A dictionary of traits you know about the user, like their email or name.

By default, traits are cached in the browser’s local storage and added to each subsequent identify call.

Example identify with hard-coded information:
```javascript
ENGAGE.identify({
  name: 'Arjun Komath',
  gender: 'male',
  age: 25,
  status: 'registered',
  email: 'arjun.komath@diagnal.com',
  network: 'Jio',
  order_valid_till: '2017-03-15'
});
```

### Track

The `track` method lets you record any actions your users perform.

```javascript
ENGAGE.track(event, [properties]);
```

The `track` call has the following fields:

| Field                     | Type                    | Description
| ------------------------- | ----------------------- | -------------
| `event`                   | String                  | The name of the event you’re tracking.
| `properties` (Optional)   | Object                  | A dictionary of options.

Example `track` call:

```javascript
ENGAGE.track('play_content', {
  content_title: 'Game of Thrones',
  content_id: 1234,
});
```

### Using built-in events
Engage SDK built-in Events gives you the ability to track events in your app that are most commonly used. For example, the content view event can be logged as follows:

```javascript
ENGAGE
    .onContentView("series-7")
    .putTitle("Game of thrones")
    .putType("series")
    .track();
```
**List of available build-in events:**

| Method                      | Description
| --------------------------- | -------------
| [`AdvertisementEventCreator`](https://github.com/diagnal/engage-js-sdk/wiki/AdvertisementEventCreator) | Event creator for Advertisement playback events
| [`ContentEventCreator`](https://github.com/diagnal/engage-js-sdk/wiki/ContentEventCreator)       | Event creator for Media Content events
| [`DownloadEventCreator`](https://github.com/diagnal/engage-js-sdk/wiki/DownloadEventCreator)     | Event creator for Content Download events
| [`PlayerEventCreator`](https://github.com/diagnal/engage-js-sdk/wiki/PlayerEventCreator)        | Event creator for Media Playback events
| [`PurchaseEventCreator`](https://github.com/diagnal/engage-js-sdk/wiki/PurchaseEventCreator)      | Event creator for Purchase events
| [`SearchEventCreator`](https://github.com/diagnal/engage-js-sdk/wiki/SearchEventCreator)        | Event creator for Search events
| [`UserEventCreator`](https://github.com/diagnal/engage-js-sdk/wiki/UserEventCreator)          | Event creator for User events


### Enabling Web Push

To Enable Web Push support for you web app, you need to add the engage-service-worker.js file at your project root and serve it as a static file so that it can be accessed directly like
http://your-web-app.com/engage-service-worker.js 

**Generate VAPID keys for Web Push API

You can install `web-push` node-js library globally and use it for generating VAPID keys.

Install like so:

    npm install web-push -g

Then you can run the following commands:

    Usage:

      web-push generate-vapid-keys [--json]

### Shutdown

The `shutdown` method lets you to force stop tracking current user.

```javascript
ENGAGE.shutdown();
```

## Sample Code

You can find sample code in the [docs](https://github.com/diagnal/engage-js-sdk/tree/master/docs) folder.
