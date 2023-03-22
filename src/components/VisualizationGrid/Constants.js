import { Point } from "../GridComponents/Point";

export const N_ROWS=20;
export const N_COLUMNS=40;
export const START_COLOR = '#FF0000';
export const END_COLOR = '#0000FF';
export const EXECUTION_INTERVAL = 60;
export const PATH_DISPLAY_INTERVAL = 20;
export const DEFAULT_START_POSITION = Point.of(Math.floor(N_ROWS/2), Math.floor(N_COLUMNS/3));
export const DEFAULT_DESTINATION_POSITION = Point.of(Math.floor(N_ROWS/2), Math.floor(2 * N_COLUMNS/3));