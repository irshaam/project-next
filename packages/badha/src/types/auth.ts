/**
 * Authentication configuration
 */
export interface AuthEnabledComponentConfig {
  auth: boolean;
}

export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> & AuthEnabledComponentConfig;
