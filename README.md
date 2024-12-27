# ts-userconfig

Typescript helper type library that handles my preferred pattern for configuration objects.

Because I'm tired of writing the same boilerplate for the way I like to do this.

```ts
import { FlattenConfig, UserConfig } from ".";

type Config = {
  required: string, // will throw a type error if it's not included
  optional: string, // will use the value in Defaults if it's not included
  omittable?: string // will just be undefined if it's not included
}

const Defaults = {
  optional: "default_value"
}

class MyClass
{
  constructor (config: UserConfig<Config, typeof Defaults>) {
    this._config = FlattenConfig(config, Defaults); // basically just does `{ ...Defaults, ...config }`
    this._config = { ...Defaults, ...config }; // ...which you can also do. i usually do.
  }

  private _config: Config;
}
```