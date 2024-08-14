import { toCSV } from './../../../../services/toCSV';
import { onBeforeMount, Ref, ref } from 'vue';
import { type task_type } from '@/data/task'; 
import { type Filters, Pagination, Sorting } from '../../../../data/page';
import {
  fetchTasks,
  fetchTask,
  addTask,
  updateTask,
  deleteTask,
  fetchScheduleTasks,
  fetchScheduleTask,
  fetchTaskTags,
} from '@/apis/task'; // Adjust the path as needed
import { useThrottle } from '../../../../data/dataControl';
import { useToast } from 'vuestic-ui';
import { useGlobalStore } from '@/stores/global-store';

const makePaginationRef = () => ref<Pagination>({ pageNum: 1, pageSize: 10, total: 30 });
const makeSortingRef = () => ref<Sorting>({ sortBy: "id", sortingOrder: "asc" });

let useTasksInstance: any = null;

export const useTasks = (options?: {
  pagination?: Ref<Pagination>;
  sorting?: Ref<Sorting>;
}) => {
  if (useTasksInstance) {
    return useTasksInstance;
  }

  const isLoading = ref(false);
  const tasks = ref<task_type[]>([]);
  const error = ref<string | null>(null); // Error state
  const toast = useToast(); // Toast for notifications
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {};
  const globalStore = useGlobalStore();

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetchTaskTags({
        tag:'sys',
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
        desc: sorting.value.sortingOrder === "asc" ? false : true,
        
      });

      tasks.value = res.data.data;
      pagination.value.total = res.data.pagination.total;
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch tasks') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const add = async (task: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      await addTask(task);
      await fetch();
      toast.init({ message: 'Task added successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to add task') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const remove = async (ids: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      await deleteTask(ids);
      await fetch();
      toast.init({ message: 'Task deleted successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to delete task') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const update = async (task: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      await updateTask(task);
      await fetch();
      toast.init({ message: 'Task updated successfully', color: 'success' });
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to update task') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  // Throttled search function
  const searchById = async (searchValue: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetchTask({id:searchValue.id});
      tasks.value = res.data.data;
      pagination.value.total = 1;
    } catch (err: any) {
      console.error(err);
      error.value = (err.message || 'Failed to fetch task by ID') as string;
      toast.init({ message: error.value, color: 'danger' });
    }
    isLoading.value = false;
  };

  const search = useThrottle(searchById, 500);

  onBeforeMount(() => {
    fetch();
  });

  useTasksInstance = {
    isLoading,
    tasks,
    
    sorting,
    pagination,

    fetch,
    add,
    remove,
    update,
    search,
  };

  return useTasksInstance;
};
