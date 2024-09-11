import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { DollarSign, Activity, CreditCard, Users } from "lucide-react";

const HomeView = () => {
	return (
		<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			<Card className="p-4">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<h1 className="text-sm font-medium">Total Revenue</h1>
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardBody>
					<div className="text-2xl font-bold">$45,231.89</div>
					<p className="text-xs text-muted-foreground">+20.1% from last month</p>
				</CardBody>
			</Card>
			<Card className="p-4">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<h1 className="text-sm font-medium">Subscriptions</h1>
					<Users className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardBody>
					<div className="text-2xl font-bold">+2350</div>
					<p className="text-xs text-muted-foreground">+180.1% from last month</p>
				</CardBody>
			</Card>
			<Card className="p-4">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<h1 className="text-sm font-medium">Sales</h1>
					<CreditCard className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardBody>
					<div className="text-2xl font-bold">+12,234</div>
					<p className="text-xs text-muted-foreground">+19% from last month</p>
				</CardBody>
			</Card>
			<Card className="p-4">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<h1 className="text-sm font-medium">Active Now</h1>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardBody>
					<div className="text-2xl font-bold">+573</div>
					<p className="text-xs text-muted-foreground">+201 since last hour</p>
				</CardBody>
			</Card>
		</div>
	);
};

export default HomeView;
