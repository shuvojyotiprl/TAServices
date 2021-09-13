create table if not exists taskdb_dev.registration
(
	id int auto_increment
		primary key,
	firstName varchar(255) not null,
	lastName varchar(255) null,
	gender varchar(255) null,
	email varchar(255) null,
	password varchar(255) null,
	number varchar(255) null,
	token text null, 
	role varchar(255) null,
	constraint email_constraint
		unique (email)
);

create table taskdb_dev.tasks
(
	taskid int auto_increment
		primary key,
	userid int not null,
	taskname varchar(255) not null,
	description varchar(255) null,
	priority enum('HIGH', 'MEDIUM', 'LOW') not null,
	issued datetime not null,
	targeted datetime not null,
	status enum('COMPLETED', 'IN_PROGRESS', 'DUE', 'OVERDUE', 'DISCARDED') not null,
	type enum('PERSONAL', 'PROFESSIONAL', 'OTHER') null,
	constraint tasks_ibfk_1
		foreign key (userid) references taskdb_dev.registration (id)
);


create index userid
	on taskdb_dev.tasks (userid);

create table taskdb_dev.skills
(
	skill_id int auto_increment
		primary key,
	skill_name varchar(255) not null,
	training_cost float not null,
	duration int not null
);

create table taskdb_dev.nomination
(
	skill_id int not null,
	user_id int not null,
	nomination_date datetime ,
	completion_date datetime ,
	percentile float ,
	status enum('IN_PROGRESS', 'PASSED', 'FAILED') null,
	primary key(skill_id,user_id),
	constraint nomination_skills_1
		foreign key (skill_id) references taskdb_dev.skills (skill_id),
		constraint nomination_registration_1
		foreign key (user_id) references taskdb_dev.registration (id)

);