import React from 'react';
import { Star, Gift, Award, Crown, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface LoyaltyTier {
  name: string;
  icon: React.ElementType;
  pointsRequired: number;
  color: string;
  benefits: string[];
}

const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Bronze',
    icon: Star,
    pointsRequired: 0,
    color: 'text-amber-600',
    benefits: [
      'Earn 1 point per €1 spent',
      'Basic customer support',
      'Standard ride options',
    ],
  },
  {
    name: 'Silver',
    icon: Award,
    pointsRequired: 1000,
    color: 'text-gray-400',
    benefits: [
      'Earn 1.5 points per €1 spent',
      'Priority customer support',
      'Flexible cancellation',
      '5% discount on rides',
    ],
  },
  {
    name: 'Gold',
    icon: Crown,
    pointsRequired: 5000,
    color: 'text-yellow-500',
    benefits: [
      'Earn 2 points per €1 spent',
      'VIP customer support',
      'Free cancellation',
      '10% discount on rides',
      'Priority driver matching',
    ],
  },
  {
    name: 'Platinum',
    icon: Zap,
    pointsRequired: 10000,
    color: 'text-blue-500',
    benefits: [
      'Earn 3 points per €1 spent',
      'Dedicated support line',
      'Free cancellation',
      '15% discount on rides',
      'Priority driver matching',
      'Free upgrades when available',
      'Airport lounge access',
    ],
  },
];

export function LoyaltyProgram() {
  const { user } = useAuth();
  const { formatAmount } = useApp();
  
  // Mock user loyalty data
  const userLoyalty = {
    points: 2500,
    lifetimePoints: 3200,
    currentTier: 'Silver',
    pointsToNextTier: 2500, // Points needed for Gold
    recentActivity: [
      {
        id: '1',
        date: '2024-03-15',
        description: 'Ride completed',
        points: 45,
        amount: 30,
      },
      {
        id: '2',
        date: '2024-03-14',
        description: 'Referral bonus',
        points: 500,
        amount: 0,
      },
      {
        id: '3',
        date: '2024-03-13',
        description: 'Ride completed',
        points: 38,
        amount: 25,
      },
    ],
  };

  const currentTierIndex = LOYALTY_TIERS.findIndex(
    tier => tier.name === userLoyalty.currentTier
  );
  const nextTier = LOYALTY_TIERS[currentTierIndex + 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Current Status */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Rewards Status</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Tier</p>
                <div className="flex items-center space-x-2">
                  <Award className={`h-6 w-6 ${LOYALTY_TIERS[currentTierIndex].color}`} />
                  <span className="text-xl font-semibold">{userLoyalty.currentTier}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Points</p>
                <p className="text-xl font-semibold">{userLoyalty.points.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lifetime Points</p>
                <p className="text-xl font-semibold">{userLoyalty.lifetimePoints.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {nextTier && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Next Tier Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{userLoyalty.currentTier}</span>
                  <span className="text-sm font-medium">{nextTier.name}</span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div
                      className="h-4 bg-blue-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          ((userLoyalty.points - LOYALTY_TIERS[currentTierIndex].pointsRequired) /
                            (nextTier.pointsRequired - LOYALTY_TIERS[currentTierIndex].pointsRequired)) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {userLoyalty.pointsToNextTier.toLocaleString()} more points needed for {nextTier.name}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tiers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {LOYALTY_TIERS.map((tier, index) => (
          <div
            key={tier.name}
            className={`bg-white rounded-lg shadow-sm p-6 ${
              tier.name === userLoyalty.currentTier
                ? 'ring-2 ring-blue-500'
                : ''
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <tier.icon className={`h-6 w-6 ${tier.color}`} />
              <h3 className="text-lg font-semibold">{tier.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {tier.pointsRequired.toLocaleString()} points required
            </p>
            <ul className="space-y-2">
              {tier.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start text-sm">
                  <Gift className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userLoyalty.recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.amount > 0 ? formatAmount(activity.amount) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    +{activity.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}