import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

// test ('테스트 #1')
//
// describe - it => describe('List') => it('renders tasks') 
// describe - context - it 
// jest-plugin => jest-plugin-context
//
// with tasks
// - List renders tasks ...
// - List renders delete button to delete task
// without tasks
// - List renders no task message
//
// TDD cycle : Red - Green - Reafactoring

describe('List', () => {
    const handleClickDelete = jest.fn();

    function renderList(tasks) {
        return render((
            <List 
               tasks={tasks}
               onClickDelete={handleClickDelete}
            />
       ));
    }

    describe('with task', () => {
        const tasks = [
            { id: 1, title: 'Task-1'},
            { id: 2, title: 'Task-2'},
        ];
        it('renders tasks', () => {
            const { getByText } = renderList(tasks);
        
            expect(getByText(/Task-1/)).not.toBeNull();
            expect(getByText(/Task-2/)).not.toBeNull();
        
        });
    
        it('List renders "완료" button to delete task', () => {
            const { getAllByText } = renderList(tasks);
       
           const buttons = getAllByText('완료')
           fireEvent.click(buttons[0]);
       
           expect(handleClickDelete).toBeCalledWith(1);
        });
    })

    describe('without tasks', () => {
        it('renders no task message', () => {
            const tasks = [];
            const { getByText } = renderList(tasks);
       
           expect(getByText(/할 일이 없어요/)).not.toBeNull();
        })
    })
})