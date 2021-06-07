-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE raw_puzzles (
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	solution_data integer[][],
	creator_id integer REFERENCES "user"
);

CREATE TABLE attempted_puzzles (
	id SERIAL PRIMARY KEY,
	player_id integer REFERENCES "user",
	puzzle_id integer REFERENCES "raw_puzzles",
	timer integer,
	input_data integer[][],
	completed BOOLEAN DEFAULT FALSE
	
);

INSERT INTO raw_puzzles (title, solution_data, creator_id) VALUES 
('Never Gonna Run Around', 	'{	{1, 1, 1, 1, 1, 1, 0, 1, 0, 0},
					{1, 1, 1, 1, 1, 1, 0, 1, 0, 0},
					{1, 0, 1, 0, 0, 1, 0, 1, 1, 1},
					{0, 0, 1, 0, 1, 1, 1, 1, 0, 0},
					{1, 1, 1, 0, 1, 0, 0, 0, 0, 1},
					{1, 0, 0, 1, 0, 1, 1, 1, 1, 1},
					{1, 0, 1, 1, 1, 0, 0, 0, 0, 1},
					{1, 0, 0, 1, 0, 1, 0, 1, 1, 1},
					{0, 1, 1, 1, 0, 1, 0, 0, 0, 1},
					{0, 0, 0, 1, 0, 1, 1, 1, 1, 1}	}',  '1');
					
INSERT INTO raw_puzzles (title, solution_data, creator_id) VALUES 
('Big Puzzle', 	'{	{ 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0 },
						{ 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0 },
						{ 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1 },
						{ 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0 },
						{ 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1 },
						{ 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1 },
						{ 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1 },
						{ 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 },
						{ 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1 },
						{ 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1 },
						{ 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0 },
						{ 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0 },
						{ 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1 },
						{ 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0 },
						{ 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1 },
						{ 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1 },
						{ 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1 },
						{ 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 },
						{ 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1 },
						{ 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1 }	}',  '1');