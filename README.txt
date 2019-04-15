Instructions to run:

Please navigate to ./robot-assignment
Open cmd or terminal
Type in 'npm install'
Type in 'ng serve'

Structure of the assignment:

I've used a robot class and a robot service to act as the single source of truth for the robot to allow
for seperation of concerns. The game-controls only handle sending controls to the service while the game-board
only handles the rendering of the robot and the board. The robot service handles the checking of inputs to make sure
they are correct and the robot class does not have an error error checking to allow for flexibility when changing
the grid dimensions.
