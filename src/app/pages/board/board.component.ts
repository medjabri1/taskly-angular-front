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
			id: 1,
			title: 'Fix Bug in Login System',
			description: "There's an issue with user authentication that needs to be addressed.",
			status: 'TO DO',
		},
		{
			id: 2,
			title: 'Design New Homepage Layout',
			description: "We need a fresh and modern design for our website's homepage.",
			status: 'ON PROGRESS',
		},
		{
			id: 3,
			title: 'Write User Manual',
			description: 'Prepare a comprehensive user manual to guide new users.',
			status: 'DONE',
		},
		{
			id: 4,
			title: 'Optimize Database Queries',
			description: 'Improve the efficiency of database queries for better performance.',
			status: 'TO DO',
		},
		{
			id: 5,
			title: 'Create Mobile App Icon',
			description: 'Design an appealing icon for our upcoming mobile application.',
			status: 'ON PROGRESS',
		},
		{
			id: 6,
			title: 'Test Cross-Browser Compatibility',
			description: 'Ensure the website works smoothly across different web browsers.',
			status: 'DONE',
		},
		{
			id: 7,
			title: 'Add Social Media Sharing',
			description: 'Incorporate social media sharing functionality into the platform.',
			status: 'QA',
		},
		{
			id: 8,
			title: 'Update Privacy Policy',
			description: 'Review and update the privacy policy according to the latest regulations.',
			status: 'TO DO',
		},
	];

	getTodoItems(): Array<Task> {
		return this.data.filter(item => item.status === 'TO DO');
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
			item.addEventListener('dragleave', (e: any) => this.handleDragLeave(e));
			item.addEventListener('drop', (e: any) => this.handleDrop(e));
		});

	}

	handleDragStart(e: any): void {
		this.draggedItem = e.target;

		this.dom_task_items.forEach((item: any) => {
			if(item === e.target) {
				// return;
			} else {
				item.style.pointerEvents = 'none';
			}
		});
	}

	handleDragEnd(e: any): void {

		this.dom_task_items.forEach((item: any) => {
			item.style.pointerEvents = 'unset';
		});

		this.dom_status_items.forEach((item: any) => {
			item.classList.remove('over');
		});
	}

	handleDrop(e: any): void {
		e.preventDefault();

		let isTargetOrParent = false;
		let dropTarget = document.elementFromPoint(e.clientX, e.clientY);

		while (dropTarget) {
			if (dropTarget.classList.contains('status__item')) {
				isTargetOrParent = true;
				break;
			}
			dropTarget = dropTarget.parentElement;
		}

		if(isTargetOrParent && dropTarget) {
			let status_title = dropTarget.querySelector('.header .title')?.textContent?.toUpperCase();

			let task_id: Number = Number(this.draggedItem.querySelector('.task__id').textContent);
			
			const taskIndex = this.data.findIndex(task => task.id === task_id);

			if (taskIndex !== -1) {
				// Create a copy of the task object with the updated status
				const updatedTask = { ...this.data[taskIndex], status: status_title };
			
				// Update the data array with the new task object
				this.data = this.data.map((task: Task) => {
					if(task.id === task_id) {
						task.status = status_title!;
						console.log(status_title)
						console.log(task);
					}
					return task;
				});
			
			} else {
				console.log('Task id not found')
			}
		}

		// this.draggedItem = null;
	}

	handleDragOver(e: any): void {

		e.preventDefault();

		const target = e.target;

		// Check if the target or its parents have the class 'status__item'
		let isTargetOrParent = false;
		let currentElement = target;
		while (currentElement) {
			if (currentElement.classList.contains('status__item')) {
				isTargetOrParent = true;
				break;
			}
			currentElement = currentElement.parentElement;
		}

		if(
			isTargetOrParent
			&& this.draggedItem != null
			&& this.draggedItem.classList.contains('task__item') 
		) {
			let status_title: string = currentElement.querySelector('.header .title').textContent.toUpperCase();

			let task_title: string = this.draggedItem.querySelector('.content .title').textContent;
			
			let item_data = this.data.filter(item => item.title === task_title)[0];
			
			if(item_data.status !== status_title) {
				currentElement.classList.add('over');	
			}
			
			let task_id: number = this.draggedItem.querySelector('.task__id').textContent;
			
			const taskIndex = this.data.findIndex(task => task.id === task_id);

			if (taskIndex !== -1) {
				// Create a copy of the task object with the updated status
				const updatedTask = { ...this.data[taskIndex], status: status_title };
			
				// Update the data array with the new task object
				this.data[taskIndex] = updatedTask;
			
				console.log('Task status updated successfully:', updatedTask);
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
