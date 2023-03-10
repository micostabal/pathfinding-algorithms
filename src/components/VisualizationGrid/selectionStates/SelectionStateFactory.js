import {
  WallSelectionState,
  OriginSelectionState,
  DestinationSelectionState,
  InactiveSelectionState,
  NotSelectedSelectionState
} from "./BaseSelectionState"
import {SelectionState} from './SelectionState';

export const SelectionStateFactory = new Map(); 
SelectionStateFactory.set(SelectionState.addWallSquare, new WallSelectionState());
SelectionStateFactory.set(SelectionState.selectOrigin, new OriginSelectionState());
SelectionStateFactory.set(SelectionState.selectDestination, new DestinationSelectionState());
SelectionStateFactory.set(SelectionState.inactive, new InactiveSelectionState());
SelectionStateFactory.set(SelectionState.notSelected, new NotSelectedSelectionState());
