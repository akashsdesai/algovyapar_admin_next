'use client'

import { AreaChart, BadgeDelta, Card, DeltaType, DonutChart, Flex, Grid, Metric, ProgressBar, SparkAreaChart, Text, Title } from "@tremor/react";
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const chartdata1 = [
  {
    month: "Jan 21",
    Performance: 4000,
    "Benchmark": 3000,
  },
  {
    month: "Feb 21",
    Performance: 3000,
    "Benchmark": 2000,
  },
  {
    month: "Mar 21",
    Performance: 2000,
    "Benchmark": 1700,
  },
  {
    month: "Apr 21",
    Performance: 2780,
    "Benchmark": 2500,
  },
  {
    month: "May 21",
    Performance: 1890,
    "Benchmark": 1890,
  },
  {
    month: "Jun 21",
    Performance: 2390,
    "Benchmark": 2000,
  },
  {
    month: "Jul 21",
    Performance: 3490,
    "Benchmark": 3000,
  },
];

const chartdata = [
  {
    date: "Jan 23",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 23",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 23",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 23",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 23",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 23",
    SemiAnalysis: 2129,
    "The Pragmatic Engineer": 2726,
  },
  {
    date: "Jul 23",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 3326,
  },
];

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];


type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

const kpiData: Kpi[] = [
  {
    title: "Sales",
    metric: "₹ 12,699",
    progress: 15.9,
    target: "₹ 80,000",
    delta: "13.2%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: "₹ 45,564",
    progress: 36.5,
    target: "₹ 125,000",
    delta: "23.9%",
    deltaType: "increase",
  },
  {
    title: "Customers",
    metric: "1,072",
    progress: 53.6,
    target: "2,000",
    delta: "10.1%",
    deltaType: "moderateDecrease",
  },
];

const valueFormatter = (number: number | bigint) => `₹ ${new Intl.NumberFormat("in").format(number).toString()}`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const { data: sessionData, status } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      if (status === 'authenticated') {
        setSession(sessionData);
      } else if (status ==='unauthenticated'){
        setSession(null);
        router.push('/login');
      }
      setLoading(false);
    };

    checkSession();
  }, [router, sessionData, status]);

  return (
    <div>
      {session && <User session={session} />}
    </div>
  );
};

const User = ({ session }: { session: Session }) => {
  return (
    <main className={styles.main}>
      <div className={styles.top}>
          <div className={styles.cards}>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
              {kpiData.map((item) => (
                <Card key={item.title}>
                  <Flex alignItems="start">
                    <div className="truncate">
                      <Text>{item.title}</Text>
                      <Metric className="truncate">{item.metric}</Metric>
                    </div>
                    <BadgeDelta deltaType={item.deltaType}>
                      {item.delta}
                    </BadgeDelta>
                  </Flex>
                  <Flex className="mt-4 space-x-2">
                    <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                    <Text className="truncate">{item.target}</Text>
                  </Flex>
                  <ProgressBar value={item.progress} className="mt-2" />
                </Card>
              ))}
            </Grid>
        </div>
        <div className={styles.chart}>
          <Card className="max-w-lg">
          <Title>Sales</Title>
          <DonutChart
            className="mt-6"
            data={cities}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>
        </div>
      </div> 
      <div className={styles.bottom}>
        <div className={styles.graph}>
          <Card className={styles.view_container}>
            <Title className={styles.view_title}>Revenue over time (INR)</Title>
            <AreaChart
              className="h-72 mt-4"
              data={chartdata}
              index="date"
              yAxisWidth={65}
              categories={["SemiAnalysis", "The Pragmatic Engineer"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
          </Card>
        </div>
        <div className={styles.stock}>
          <div>
          <Card className="max-w-lg flex items-center justify-between mx-auto px-4 py-3.5">
            <div className="flex items-center space-x-2.5">
              <Title>AAPL</Title>
              <Text className="hidden sm:block">Apple Inc.</Text>
            </div>
            <SparkAreaChart
              data={chartdata1}
              categories={["Performance"]}
              index={"month"}
              colors={["emerald"]}
              className="h-10 w-36"
            />
            <div className="flex items-center space-x-2.5">
              <span className="font-medium rounded text-gray-700">179.26</span>
              <span className="px-2 py-1 text-sm font-medium rounded text-white bg-emerald-500">+1.72%</span>
            </div>
          </Card>
          </div>
          <div>
            <Card className="max-w-lg flex items-center justify-between mx-auto px-4 py-3.5">
              <div className="flex items-center space-x-2.5">
                <Title>TATAMOTORS</Title>
                <Text className="hidden sm:block">Tata Motors. </Text>
              </div>
              <SparkAreaChart
                data={chartdata1}
                categories={["Performance"]}
                index={"month"}
                colors={["emerald"]}
                className="h-10 w-36"
              />
              <div className="flex items-center space-x-2.5">
                <span className="font-medium rounded text-gray-700">179.26</span>
                <span className="px-2 py-1 text-sm font-medium rounded text-white bg-emerald-900">+1.72%</span>
              </div>
            </Card>
          </div>
          <div>
            <Card className="max-w-lg flex items-center justify-between mx-auto px-4 py-3.5">
              <div className="flex items-center space-x-2.5">
                <Title>HCLTECH</Title>
                <Text className="hidden sm:block">HCL. </Text>
              </div>
              <SparkAreaChart
                data={chartdata1}
                categories={["Performance"]}
                index={"month"}
                colors={["emerald"]}
                className="h-10 w-36"
              />
              <div className="flex items-center space-x-2.5">
                <span className="font-medium rounded text-gray-700">179.26</span>
                <span className="px-2 py-1 text-sm font-medium rounded text-white bg-emerald-700">+1.72%</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
