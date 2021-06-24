create table if not exists tasks_dev.registration
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

create table tasks_dev.tasks
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
		foreign key (userid) references tasks_dev.registration (id)
);

create index userid
	on tasks_dev.tasks (userid);

