import { SetMetadata } from '@nestjs/common';

/**
 * Define Public Route
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
