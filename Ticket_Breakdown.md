# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1

### Description

At the moment users can't specify their own agent ID related to each faciliy. In the shift reports users are seeing internal database id of each agent wich doesn't make sense to them and are difficult to relate with other agent systems the users use.

**Solution**
Create a relational table Facility_Agent where we can connect Agents and Facilities and this way users can define an ID for every agent within their facility. Also this allows to the same Agent to have different ID's depending on the facility he is working on.

**This table must have this fields:**

- \_id: primaryKey - numeric - incremental [identifies every registry]
- agentId: foreignKey [identifies every agent from Agents table]
- facilityId: foreignKey [identifies every facility from Facilities table]
- facilityAgentId: string [input from user]

**Constraints:**

- Registry can not be created if agentId nor facilityId exists in corresponding tables (Agents and Facilities)
- \_id can not be repeated
- facilityAgent can not be null/undefined

**Suggested story points**
5

## Ticket 2

### Description

New agent metadata will be available to extend the information the system have for each shift.

**Solution**
Update function `getShiftsByFacility` to include in the metadata of the agent the **facilityAgentId** of the agent assigned.
This information can be retrieved from the table Facility_Agent selecting the registry from the table by **facilityId** and **agentId**.

Whenever this function is executed the new field **facilityAgentId** must be included. In case that for the required **facilityId** and **agentId** there is no registry at the Facility_Agent table, return empty string in the field

**Suggested story points**
3

## Ticket 3

### Description

At the moment in the ID column of the report the user is informed with the internal database Id of each agent. Some facilities want to display their own custom ID instead of the internal database ID. New information will be available at the agent metadata for each shift.

**Solution**
Update function `generateReport` to include the **facilityAgentId** fo the agent assigned for the provided shift.
In case **facilityAgentId** is empty keep printing internal database agent ID.

**Acceptance criteria**

- When user from facility without custom agent id generates shift report => internal database agent id is shown at the Agent ID column
- When user from facility with custom agent id generates shift report => custom agent ID is shown at the Agent ID column
- When report is generated for shifts where the same agent was assigned but in different facilities, and in one facility that agent does have a custom ID but in the other facility he doesn't have custom ID => the reports show differents IDs for the same agent in different facilities.

**Suggested story points**
1
