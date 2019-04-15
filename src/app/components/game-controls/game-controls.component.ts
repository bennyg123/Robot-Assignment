import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Report, Robot, Direction } from '../../classes/robot';
import { RobotStateService } from 'src/app/services/robot-state.service';
import { $ } from 'protractor';
import { delay } from 'q';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.css']
})
export class GameControlsComponent implements OnInit {

  _NOTIFICATION_TIMEOUT = 1500;

  robot : {position : Report, visible : boolean};
  notification : {message : string, error : boolean};
  notificationTimer : any;
  reportMessage : string;
  userInput: string;

  constructor(private robotStateService : RobotStateService ) {
    this.robot = {
      position : {
        x: 0,
        y: 0,
        dir: Direction.North
      },
      visible : false
    };

    this.notification = {
      message : "This where notification messages will show",
      error : false
    };

    robotStateService.errorEmitter.subscribe(message => {
      this.notification = {
        message : message,
        error : true
      }
      this.notification.error = true;
      clearTimeout(this.notificationTimer);

      this.notificationTimer = setTimeout(() => {
        this.notification.message = "This where notification messages will show";
        this.notification.error = false;
      }, this._NOTIFICATION_TIMEOUT);
    });

    robotStateService.successEmitter.subscribe(success => {
      this.notification = {
        message : success.message,
        error : false
      }
      clearTimeout(this.notificationTimer);

      this.notificationTimer = setTimeout(() => {
        this.notification.message = "This where notification messages will show";
      }, this._NOTIFICATION_TIMEOUT);
    });
  }

  ngOnInit() {
  }

  placeRobotClickHandler() {
    this.robotStateService.place(this.robot.position.x, this.robot.position.y, this.robot.position.dir);
  }

  rotateLeftClickHandler() {
    this.robotStateService.rotateLeft();
  }

  rotateRightClickHandler() {
    this.robotStateService.rotateRight();
  }

  moveForwardClickHandler() {
    this.robotStateService.moveForward();
  }

  getReport() {


    let rep  = this.robotStateService.getReport();

    if (rep == undefined) {
        return;
    }

    let {x, y, dir} = rep;
    let dirMessage : string;
    switch (dir) {
      case Direction.North:
      dirMessage = "North";
      break;
      case Direction.East:
      dirMessage = "East";
      break;
      case Direction.West:
      dirMessage = "West";
      break;
      case Direction.South:
      dirMessage = "South";
      break;
    }

    this.reportMessage = "The robot is at x : " + x + ", y : " + y + ", facing " + dirMessage;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async sendTestInputToRobot() {

    this.robot.position = {x : 0, y : 0, dir: Direction.North};

    this.placeRobotClickHandler();
    await delay(1000);
    this.rotateRightClickHandler();
    await delay(1000);
    this.moveForwardClickHandler();
    await delay(1000);
    this.moveForwardClickHandler();
    await delay(1000);
    this.rotateLeftClickHandler();
    await delay(1000);
    this.moveForwardClickHandler();
    await delay(1000);
    this.moveForwardClickHandler();
    await delay(1000);
    this.getReport();
    
  }

  userInputHandler() {
    let uI = this.userInput.toUpperCase();
    const regex = /^(PLACE \d,\d,(WEST|NORTH|EAST|SOUTH))|(MOVE|LEFT|RIGHT|REPORT)$/gm;
    if (!(new RegExp(regex)).test(uI)) {
      this.notification = {
        message : "Invalid input",
        error : true
      }
      clearTimeout(this.notificationTimer);

      this.notificationTimer = setTimeout(() => {
        this.notification.message = "This where notification messages will show";
        this.notification.error = false;
      }, this._NOTIFICATION_TIMEOUT);

      return;
    }

    if (uI.startsWith("PLACE")) {
      let placeArray = uI.split(" ")[1].split(",");

      if (placeArray.length == 3) {
        switch(placeArray[2]) {
          case "NORTH":
            this.robot.position = {
              x : parseInt(placeArray[0]),
              y : parseInt(placeArray[1]),
              dir : Direction.North
            }
            this.placeRobotClickHandler();
          break;
          case "SOUTH":
            this.robot.position = {
              x : parseInt(placeArray[0]),
              y : parseInt(placeArray[1]),
              dir : Direction.South
            }
            this.placeRobotClickHandler();
          break;
          case "EAST":
            this.robot.position = {
              x : parseInt(placeArray[0]),
              y : parseInt(placeArray[1]),
              dir : Direction.East
            }
            this.placeRobotClickHandler();
          break;
          case "WEST":
            this.robot.position = {
              x : parseInt(placeArray[0]),
              y : parseInt(placeArray[1]),
              dir : Direction.West
            }
            this.placeRobotClickHandler();
          break;
          
          }
      }

    }else {
      switch(uI) {
        case "MOVE": this.moveForwardClickHandler(); break;
        case "LEFT": this.rotateLeftClickHandler(); break;
        case "RIGHT": this.rotateRightClickHandler(); break;
        case "REPORT": this.getReport(); break;
      }
    }

  }

}
