<h1>Task-Tracker</h1>
<h4>About api </h4>
<ul>
<li>This is a project management api with authentication and authorisation using <strong>JWT token</strong></li>
  <li>User has the ability to create an account and verify it with a token through the email</li>
<li>User can create,edit and delete tasks associated with his/her account</li>
  </ul>
<h4>Technologies </h4>
<ul>
  <li>Node js</li>
  <li>Express</li>
  <li>Mongo Db</li>
  <li>Mongoose</li>
</ul>
<h4>How to test this api </h4>
<ul>
  <li>Clone this repo to your machine and run npm install to install all the dependencies</li>
  <li>Set up all the environmental variables</li>
  <li>Start the development server by running npm start</li>
</ul>
<h5>End Points </h5>
<table>
  <tr>
    <td><strong>Endpoint</strong></td>
    <td><strong>Method</strong></td>
        <td><strong>Role</strong></td>
  </tr>
  <tbody>
    <tr>
  <td/>/api/v1/users/register</td>
  <td>post</td>
  <td>Registering first time users</td>
    </tr>
     <tr>
  <td>/api/v1/users/login</td>
    <td>post</td>
  <td>Logging into account</td>
    </tr>
     <tr>
  <td>/api/v1/users/forgotPassword</td>
  <td>post</td>
  <td>Getting password reset token</td>
    </tr>
     <tr>
  <td>/api/v1/users/logout</td>
  <td>get</td>
  <td>Logging out of account</td>
    </tr>
     <tr>
  <td>/api/v1/users/changePassword</td>
  <td>post</td>
  <td>Changing password</td>
    </tr>
       <tr>
  <td>/api/v1/users/passwordReset/:token</td>
  <td>post</td>
  <td>Resetting password</td>
    </tr>
         <tr>
  <td>/api/v1/users/activate-account/:token</td>
  <td>get</td>
  <td>Activating account</td>
    </tr>
             <tr>
  <td>/api/v1/tasks</td>
  <td>get</td>
  <td>Getting all tasks in database</td>
    </tr>
               <tr>
  <td>/api/v1/tasks</td>
  <td>post</td>
  <td>Adding tasks to database</td>
    </tr>
               <tr>
  <td>/api/v1/tasks/:id</td>
  <td>delete</td>
  <td>Deleting tasks</td>
    </tr>
                <tr>
  <td>/api/v1/tasks/:id</td>
  <td>patch</td>
  <td>Editing tasks</td>
    </tr>
                <tr>
  <td>/api/v1/tasks/myTasks</td>
  <td>get</td>
  <td>Getting tasks for specif user</td>
    </tr>
</tbody>
</table>
