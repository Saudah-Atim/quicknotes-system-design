QuickNotes System Architecture

1. System Requirements

The system should allow users to:

View their notes.

Create new notes.

Delete notes.

See messages when something goes wrong.

The system should also be fast, secure and available to users.

2. Architecture Diagram

          User / Browser
                 |
                DNS
                 |
                CDN
                 |
           Load Balancer
              /      \
             /        \
       App Server 1  App Server 2
             |          |
             |        Cache
             |          |
          Primary Database
                 |
            Read Replica

        App Servers
             |
            Queue
             |
       Background Worker

3. Main Components

Component

What it does

DNS

Finds the website address.

CDN

Helps load website files faster.

Load Balancer

Shares work between servers.

App Servers

Handle user requests.

Cache

Helps load notes faster.

Primary Database

Stores notes and user details.

Read Replica

Helps with reading data.

Queue

Holds tasks waiting to be done.

Background Worker

Handles tasks in the background.

These components help the system handle more users and work properly.

4. How Requests Work

GET – View Notes

The user opens QuickNotes.

The request goes through the load balancer.

An app server receives the request.

It gets the notes from the cache or database.

The notes are shown to the user.

POST – Create a Note

The user enters a note and clicks Save.

The request goes to an app server.

The server checks the information.

The note is saved in the database.

The user receives a success message.

5. Estimates for 1 Million Users

These are estimates based on 100,000 daily active users.

Item

Estimate

Registered users

1,000,000

Daily active users

100,000

Daily reads

2,000,000

Reads per second

About 23

Daily new notes

200,000

Writes per second

About 2.3

Storage per year

About 146 GB

The storage estimate is based on each note using about 2 KB.

6. Trade-offs and Reliability

Cache: Makes loading faster, but it may show old information.

Read Replica: Helps with reading requests, but updates may take time to appear.

Multiple Servers: Help the system continue working if one server fails, but cost more.

Background Queue: Helps handle tasks later, but needs extra management.

To avoid one failure stopping the whole system, QuickNotes will use two app servers, database backups and a load balancer.