import { Injectable, EventEmitter } from '@angular/core';
import { Robot, Direction, Report, SuccessMessage } from '../classes/robot';

@Injectable({
  providedIn: 'root'
})
export class RobotStateService 
{

  private
    successEmitter : EventEmitter<SuccessMessage> = new EventEmitter();
    errorEmitter : EventEmitter<string> = new EventEmitter();
    robot : Robot;

  constructor() 
  { 
  }

  place(x : number, y : number, dir : Direction) : boolean 
  {

    if (x > 4 || x < 0 || y > 4 || y < 0) {
        this.errorEmitter.emit("Invalid coordinates");
        return false;
    }

    this.robot = new Robot(x, y, dir);

    let dirMessage : string;
    switch (dir) {
      case "0":
        dirMessage = "North";
      break;
      case "1":
        dirMessage = "East";
      break;
      case "2":
        dirMessage = "South";
      break;
      case "3":
        dirMessage = "West";
      break;
    }

    this.successEmitter.emit({
      message : "Sucessfully placed robot at " + x + " " + y + " facing " + dirMessage,
      type : 0
    });

    return true;
  }
  
  rotateLeft() : boolean 
  {
    if (this.robot !== undefined && this.robot.rotateLeft() ) {
      this.successEmitter.emit({
        message : "Rotation left sucessful",
        type : 1
      });
      return true;
    }else {
      this.errorEmitter.emit("Rotation left failed");
      return false;
    }
  }

  rotateRight() : boolean 
  {
    if (this.robot !== undefined && this.robot.rotateRight() ) {
      this.successEmitter.emit({
        message : "Rotation right sucessful",
        type : 2
      });
      return true;
    }else {
      this.errorEmitter.emit("Rotation right failed");
      return false;
    }
  }

  moveForward() : boolean 
  {

    if (this.robot == undefined) {
      this.errorEmitter.emit("Move foward failed, please place robot first");
      return false;
    }

    let { x , y, dir } = this.robot.getReport();

    switch (dir) {
      case Direction.North:
        if (y== 4) {
          this.errorEmitter.emit("Move foward failed, will go off board");
          return false;
        }
        break;
      case Direction.East:
        if (x == 4) {
          this.errorEmitter.emit("Move foward failed, will go off board");
          return false;
        }
        break;
      case Direction.South:
        if (y == 0) {
          this.errorEmitter.emit("Move foward failed, will go off board");
          return false;
        }
        break; 
      case Direction.West:
        if (x == 0) {
          this.errorEmitter.emit("Move foward failed, will go off board");
          return false;
        }
        break;
    }

    if (this.robot.moveForward()) {
      this.successEmitter.emit({
        message : "Move forward sucessful",
        type : 3
      });
    }

    return true;
  }

  getReport() : Report 
  {
    if (this.robot == undefined) {
      this.errorEmitter.emit("Robot is not defined cannot get report");
    }else {
      return this.robot.getReport();
    }
  }
}
