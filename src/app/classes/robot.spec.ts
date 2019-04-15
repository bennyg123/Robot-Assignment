import { Robot, Direction } from './robot';

describe('Robot', () => {
  it('should create an instance', () => {
    expect(new Robot()).toBeTruthy();
  });

  it('should move forward', () => {
    expect(new Robot().moveForward()).toBeTruthy();
  });

  it('should turn left', () => {
    expect(new Robot().rotateLeft()).toBeTruthy();
  });

  it('should turn right', () => {
    expect(new Robot().rotateRight()).toBeTruthy();
  });

  it('should give a report', () => {
    expect(new Robot().getReport()).toEqual({x : 0, y : 0, dir: Direction.North}) ;
  });
});
