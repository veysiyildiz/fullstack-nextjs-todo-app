'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import { TodoValidation } from '@/lib/validations/todo';

interface Props {
  userId: string;
  status: string;
  setOpen: (isOpen: boolean) => void;
  handleAddTodo: ({ title, desc, status }: { title: string; desc: string; status: string }) => void;
}

function CreateTodo({ userId, setOpen, handleAddTodo, status }: Props) {
  const form = useForm<z.infer<typeof TodoValidation>>({
    resolver: zodResolver(TodoValidation),
    defaultValues: {
      title: '',
      desc: '',
      status: status,
      author: userId,
    },
  });

  const onSubmit = (values: z.infer<typeof TodoValidation>) => {
    handleAddTodo({
      title: values.title,
      desc: values.desc,
      status: values.status,
    });

    setOpen(false);
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Title
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='desc'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Description
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select todo status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          Create Todo
        </Button>
      </form>
    </Form>
  );
}

export default CreateTodo;
