/**
 * Represents keys of TConfig that are neither specified within the TDefaults default object and
 * are not marked as optional. (These keys MUST be supplied to satisfy UserConfig constraints.)
 * 
 * @template TConfig
 * @template TDefaults
 */
export type RequiredConfigValues<TConfig extends {}, TDefaults extends {}> =
  { [k in Exclude<Exclude<keyof TConfig, keyof TDefaults>, keyof OmittableConfigValues<TConfig>>]: TConfig[k] }

/**
 * Represents keys of TConfig that are specifically optional and are not supplied in a default
 * object type.
 * 
 * @template TConfig
 */
export type OmittableConfigValues<TConfig extends {}> =
  { [k in keyof TConfig as undefined extends TConfig[k] ? k : never]: TConfig[k] }

/**
 * Represents keys of TConfig that are specified within the TDefaults default object type.
 * 
 * @template TConfig
 * @template TDefaults
 */
export type OptionalConfigValues<TConfig extends {}, TDefaults extends {}> =
  { [k in keyof TConfig as k extends keyof TDefaults ? k : never]: TConfig[k] }

/**
 * Represents a user configuration given the base Config type and the type of a Defaults object.
 * 
 * Requires the presence of all keys not expressly marked optional and not supplied in the
 * Defaults object.
 * 
 * Permits the absence OR presence of those keys marked optional or supplied in the Defaults object.
 * 
 * Does not permit extraneous keys.
 * 
 * @template TConfig configuration object type
 * @template TDefaults default object type (consider `typeof Defaults` to reduce excess typing?)
 */
export type UserConfig<TConfig extends {}, TDefaults extends {}> =
  & Partial<OptionalConfigValues<TConfig, TDefaults>>
  & Partial<OmittableConfigValues<TConfig>>
  & RequiredConfigValues<TConfig, TDefaults>

/**
 * Flatten a user configuration and defaults into a final configuration with every value represented.
 * If a user doesn't supply a value that's optional, use the defaults value.
 * @param config UserConfig<TConfig,TDefaults> user configuration
 * @param defaults TDefaults default values for configuration
 * @returns TConfig final configuration with all values represented
 */
export const FlattenConfig = <TConfig extends {}, TDefaults extends {}>(
  config: UserConfig<TConfig, TDefaults>,
  defaults: TDefaults
): TConfig => ({ ...defaults, ...config } as unknown as TConfig)