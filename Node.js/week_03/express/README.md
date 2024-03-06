Instructions how to run the application

1. Navigate to the project directory using the terminal.
2. Install the NPM dependencies with command `npm install`
3. Run the server run `npm start`.

API Endpoints Documentation:

1. GET /todos

   Description: Retrieve all tasks.
   Method: GET
   Request Parameters: None
   Response Format: Array of task objects

2. GET /todos/:id

   Description: Retrieve a task by its ID.
   Method: GET
   Request Parameters: Task ID
   Response Format: Single task object

3. POST /todos

   Description: Create a new task.
   Method: POST
   Request Body Format: JSON object with todo, priority, and dueDate fields.
   Response Format: The task object that is created

4. PATCH /todos/:id

   Description: Update an existing task by its ID.
   Method: PATCH
   Request Parameters: Task ID
   Request Body Format: JSON object with todo, priority, and dueDate fields to update
   Response Format: Updated task object

5. DELETE /todos/:id

   Description: Delete a task by its ID.
   Method: DELETE
   Request Parameters: Task ID.
   Response Format: message for successfully deleted task
