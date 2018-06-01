## Translating Divinity: Original Sin 2

This is an attempt at automating the translation of [Divinity: Original Sin 2](https://divinity.game/).

The translation relies on Google Translate, so it's far from perfect, but it's an easy starting point: from here
anyone can add their language and involve other people to "crowd-translate".

The instructions as of now are meant to be read by a programmer, I will update them in the future if people
will need it.

### Configuration

You will need to [configure a Google Translate project](https://cloud.google.com/translate/docs/quickstart). Mind you
that translating text will cost you money, not a lot, I believe around 20$ for the whole thing but I can't guarantee on that.

Once you have that [try the example request](https://cloud.google.com/translate/docs/quickstart#make_a_translation_api_request) to
see if everything is working in your Google Translate project, it should be working before you move on.

`npm install` at the root of this project will fetch all the dependencies.

### Run it

As of now this is configured to translate English to Italian, but to adjust it to your needs you just need to change a couple
paths in `translate-main.js` and `translate-subtitles.js`.

### Use it

You will need [Norbyte's Extractor Tool](https://docs.larian.game/Pak_Extractor_Guide).

Compress the resulting folder wrapped in a containing folder, so something like this:

`C:\Users\yourself\Downloads\containing-folder\Localization\...`

otherwise you will not see the correct language in game. `Localization` is the one containing your language, in my case
it was containing

```
├── Italian
│   ├── Gender
│   │   └── Female
│   └── Subtitles
```

Remember to give to Norbyte's Extract Tool `C:\Users\yourself\Downloads\containing-folder` as the `"Source path"` or you will
not see your language once in game!

### Need help?

Feel free to [open an issue](issues/new), I will try my best to help you!

### Disclaimer

I do not own right for any of the Localised contents used here, I just downloaded them from [here](https://docs.larian.game/Modding:_Localization).

Also be careful I've coded this on a rush and it does not follow best practices, I was just interested in the result, so that
I could play with a friend :)

