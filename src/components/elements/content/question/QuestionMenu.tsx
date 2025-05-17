import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

type Status = 'selected' | 'unselected' | 'error' | 'warning' | 'correct';

type Props = {
    onIndexClick: (index: number) => void;
    states: Status[];
};

const variantMap: Record<Status, ButtonProps['variant']> = {
    selected: 'selected',
    unselected: 'outline',
    error: 'destructive',
    warning: 'warning',
    correct: 'correct',
};

const QuestionMenu = ({ onIndexClick, states }: Props) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {states.map((status, index) => (
                <Button
                    key={index}
                    type="button"
                    variant={variantMap[status]}
                    className={cn('rounded-full w-12 h-12 text-center')}
                    onClick={() => onIndexClick(index)}
                >
                    {index + 1}
                </Button>
            ))}
        </div>
    );
};

export default React.memo(QuestionMenu);
