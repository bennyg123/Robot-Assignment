export enum Direction {
    North = "0",
    East = "1",
    South = "2",
    West = "3"
}

export interface SuccessMessage {
    message : string,
    type : number
}

export interface Report {
    x : number,
    y : number,
    dir : Direction
}

export class Robot {
    /*
    Class Variables

    private
        xPos : number;
        yPos : number;
        direction : Direction
    */
    constructor(private xPos = 0, private yPos = 0,private direction = Direction.North) 
    {

    }

    rotateLeft() : boolean {
        switch(this.direction) {
            case Direction.North:
                this.direction = Direction.West;
                break;
            case Direction.East:
                this.direction = Direction.North;
                break;
            case Direction.South:
                this.direction = Direction.East;
                break;
            case Direction.West:
                this.direction = Direction.South;
                break;
            default:
                return false;
        }
        return true;
    }

    rotateRight() : boolean {
        switch(this.direction) {
            case Direction.North:
                this.direction = Direction.East;
                break;
            case Direction.East:
                this.direction = Direction.South;
                break;
            case Direction.South:
                this.direction = Direction.West;
                break;
            case Direction.West:
                this.direction = Direction.North;
                break;
            default:
                return false;
        }
        return true;
    }

    moveForward() : boolean {
        switch(this.direction) {
            case Direction.North:
                this.yPos += 1;
                break;
            case Direction.East:
                this.xPos += 1;
                break;
            case Direction.South:
                this.yPos -= 1;
                break;
            case Direction.West:
                this.xPos -= 1;
                break;
            default:
                return false;
        }
        return true;
    }

    getReport() : Report {
        return {
            x : this.xPos,
            y : this.yPos,
            dir : this.direction
        };
    }
}
