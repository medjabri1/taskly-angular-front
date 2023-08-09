import {
	AfterViewInit,
	Component,
	ElementRef,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { Task } from 'src/app/models/Task';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
	TASK_STATUSES: Object = {
		TODO: 'TODO',
		ONPROGRESS: 'ONPROGRESS',
		DONE: 'DONE',
		QA: 'QA',
	};

	data: Array<Task> = [
		{
			title: 'Fix Bug in Login System',
			description:
				"There's an issue with user authentication that needs to be addressed.",
			status: 'TODO',
		},
		{
			title: 'Design New Homepage Layout',
			description:
				"We need a fresh and modern design for our website's homepage.",
			status: 'ON PROGRESS',
		},
		{
			title: 'Write User Manual',
			description: 'Prepare a comprehensive user manual to guide new users.',
			status: 'DONE',
		},
		{
			title: 'Optimize Database Queries',
			description:
				'Improve the efficiency of database queries for better performance.',
			status: 'TODO',
		},
		{
			title: 'Create Mobile App Icon',
			description:
				'Design an appealing icon for our upcoming mobile application.',
			status: 'ON PROGRESS',
		},
		{
			title: 'Test Cross-Browser Compatibility',
			description:
				'Ensure the website works smoothly across different web browsers.',
			status: 'DONE',
		},
		{
			title: 'Add Social Media Sharing',
			description:
				'Incorporate social media sharing functionality into the platform.',
			status: 'QA',
		},
		{
			title: 'Update Privacy Policy',
			description:
				'Review and update the privacy policy according to the latest regulations.',
			status: 'TODO',
		},
	];

	getTodoItems(): Array<Task> {
		return this.data.filter(item => item.status === 'TODO');
	}

	getProgressItems(): Array<Task> {
		return this.data.filter(item => item.status === 'ON PROGRESS');
	}

	getDoneItems(): Array<Task> {
		return this.data.filter(item => item.status === 'DONE');
	}

	getQAItems(): Array<Task> {
		return this.data.filter(item => item.status === 'QA');
	}


	// HANDLE DRAG

	dom_task_items: any = [];
	dom_status_items: any = [];

	draggedItem: any = null;

	ngAfterViewInit(): void {
		this.dom_task_items = document.querySelectorAll('.task__item');
		this.dom_status_items = document.querySelectorAll('.status__item');

		this.dom_task_items.forEach((item: any) => {
			item.addEventListener('dragstart', (e: any) => this.handleDragStart(e));
			item.addEventListener('dragend', (e: any) => this.handleDragEnd(e));
		});

		this.dom_status_items.forEach((item: any) => {
			item.addEventListener('dragover', (e: any) => this.handleDragOver(e));
		});

		this.dom_status_items.forEach((item: any) => {
			item.addEventListener('dragleave', (e: any) => this.handleDragLeave(e));
		});
		
	}

	handleDragStart(e: any): void {
		console.log('dragstart');
		this.draggedItem = e.target;
	}

	handleDragEnd(e: any): void {
		console.log('dragEnd');
		this.draggedItem = null;
	}

	handleDragOver(e: any): void {

		e.preventDefault();
		if(e.target.classList.contains('status__item')
			&& this.draggedItem != null
			&& this.draggedItem.classList.contains('task__item') 
		) {
			let status_title: string = e.target.querySelector('.header .title').textContent.toUpperCase();

			let task_title: string = this.draggedItem.querySelector('.content .title').textContent;

			let item_data = this.data.filter(item => item.title === task_title)[0];

			if(item_data.status !== status_title) {
				console.log(status_title);
				e.target.classList.add('over');	
			}

		}
		// console.log('dragOver');
	}

	handleDragLeave(e: any): void {
		e.target.classList.remove('over');
		// e.preventDefault();
		// if(e.target.classList.contains('status__item')) {
		// 	this.
		// }
		// console.log('dragOver');
	}
}
