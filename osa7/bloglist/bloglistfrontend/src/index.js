import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NotificationContextProvider} from './reducers/NotificationReducer';
import {UserAccountContextProvider} from './reducers/UserAccountReducer';
import {UsersContextProvider} from './reducers/UsersReducer';
import {BlogsContextProvider} from './reducers/BlogsReducer';
import {PathContextProvider} from './reducers/PathReducer';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<PathContextProvider>
			<UserAccountContextProvider>
				<UsersContextProvider>
					<BlogsContextProvider>
						<NotificationContextProvider>
							<App />
						</NotificationContextProvider>
					</BlogsContextProvider>
				</UsersContextProvider>
			</UserAccountContextProvider>
		</PathContextProvider>
	</QueryClientProvider>
);
