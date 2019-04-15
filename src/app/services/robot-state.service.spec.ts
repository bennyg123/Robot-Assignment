import { TestBed } from '@angular/core/testing';

import { RobotStateService } from './robot-state.service';
import { Direction } from '../classes/robot';

describe('RobotStateService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    expect(service).toBeTruthy();
  });

  it('should be Placed', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    expect(service.place(0, 0, Direction.South)).toBeTruthy();
  });


  it('should move forward', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    service.place(0, 0, Direction.North);
    expect(service.moveForward()).toBeTruthy();
  });

  it('should not move forward', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    service.place(0, 0, Direction.South);
    expect(service.moveForward()).toBeFalsy();
  });

  it('should rotate left', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    service.place(0, 0, Direction.South);
    expect(service.rotateLeft()).toBeTruthy();
  });

  it('should rotate right', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    service.place(0, 0, Direction.South);
    expect(service.rotateRight()).toBeTruthy();
  });

  it('should not move forward', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    expect(service.rotateRight()).toBeFalsy();
  });

  it('should give a report', () => {
    const service: RobotStateService = TestBed.get(RobotStateService);
    service.place(0, 0, Direction.East)
    expect(service.getReport()).toEqual({x : 0, y : 0, dir: Direction.East}) ;
  });
});
