[![N|Solid](http://i.imgur.com/iz9YsTS.png)](https://diagnal.com)
# Engage JavaScript SDK #

Engage is real-time targeted marketing campaigns that drive user acquisition and conversion.
It promotes content to users and access customer sentiment.

Engage JavaScript SDK allows easy integration of Engage to you web application in a few steps.

## Installation
Include the Engage JS library file in your HTML head element and initialize the SDK with your credentials.
```html
<script type="text/javascript" src="https://cdn.engage.diagnal.com/engage-core.js"></script>
<script>
ENGAGE.initialize("{client_id}", "{project_id}", {options});
</script>
```
### Options

| Field           | Type                    | Description
| --------------- | ----------------------- | -------------
| `modules`       | Data collection modules | gtm, know

### Example

```javascript
ENGAGE.initialize("8asdf643-f645-4dfb-a2se-sdfa33ac9f9e", "Ha45dfb9g", {
          modules: ['gtm']
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

By default, traits are cached in the browser’s local storage and attached to each subsequent identify call. For example, you might do that when someone signs up for a newsletter but hasn’t yet created an account on your site:

Example identify with hard-coded information:
```javascript
ENGAGE.identify({
  name: 'Arjun Komath',
  email: 'arjun.komath@diagnal.com',
  age: 25
});
```

and when the user completes signup:

```javascript
ENGAGE.identify('1506', {
  name: 'Arjun Komath',
  email: 'arjun.komath@diagnal.com'
});
```

### Track

The `track` method lets you record any actions your users perform. You can see a track example in the guide or find details on the track method payload.

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
  content_title: 'How to Create a Tracking Plan',
  content_id: 1234,
});
```

### Shutdown

The `shutdown` method lets you to force stop tracking current user.

```javascript
ENGAGE.shutdown();
```
