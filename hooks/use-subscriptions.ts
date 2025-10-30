import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export interface Isubscription {
  subscriptionId: string;
  status: string;
  previousBillingData: string;
  nextBillingDate: string;
  plan: string;
  planDescription: string;
  priceDetails: {
    type: string;
    price: string;
    currency: string;
    payment_frequency_count: string;
    payment_frequency_interval: string;
    trial_period_days: string;
  };
  customerId: string;
}

export interface IsubscriptionPlan {
  name: string;
  product_id: string;
  description: string;
  price_detail: {
    type: string;
    price: string;
    currency: string;
    payment_frequency_count: string;
    payment_frequency_interval: string;
    trial_period_days: string;
  };
}

export const useSubscriptions = () => {
  const [subscriptionsData, setSubscriptionData] = useState<
    Isubscription[] | null
  >();
  const [plan, setPlan] = useState("");

  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);
  const fetchSubscriptions = async () => {
    setLoadingSubscriptions(true);
    try {
      const { data } = await apiClient.get(`/api/subscription`);
      setSubscriptionData(data?.subscriptions);
      setPlan(data?.subscriptions[0]?.plan);
    } catch (e) {
      toast("failed to get your subscriptions");
    }

    setLoadingSubscriptions(false);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return { subscriptionsData, loadingSubscriptions, fetchSubscriptions, plan };
};

export const usePlans = () => {
  const [plans, setPlans] = useState<IsubscriptionPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      const { data } = await apiClient.get(`/api/subscription/plans`);
      setPlans(data?.plans);
    } catch (e) {
      toast("failed to get plans");
    }

    setLoadingPlans(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, loadingPlans };
};
