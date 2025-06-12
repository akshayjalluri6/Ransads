import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, variant, ...props }) => {
				let icon = <Info className="w-6 h-6 text-sky-500 flex-shrink-0" />;
				if (variant === 'destructive') {
					icon = <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />;
				} else if (variant === 'success') {
					icon = <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />;
				}
				return (
					<Toast key={id} variant={variant} icon={icon} {...props}>
						<div className="flex items-center gap-3">
							{icon}
							<div className="grid gap-1">
								{title && <ToastTitle>{title}</ToastTitle>}
								{description && (
									<ToastDescription>{description}</ToastDescription>
								)}
							</div>
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
