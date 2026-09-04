import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function DevelopmentScreen() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('projects');

  const projects = [
    { id: 1, name: 'Sample Project', type: 'Web App', status: 'In Progress' },
    { id: 2, name: 'Test App', type: 'Mobile App', status: 'Planning' },
  ];

  const devModules = [
    { name: 'Code Generation', icon: 'code-braces', description: 'Generate code' },
    { name: 'Testing', icon: 'beaker', description: 'Run tests' },
    { name: 'Debugging', icon: 'bug', description: 'Debug issues' },
    { name: 'Documentation', icon: 'file-document', description: 'Create docs' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 8,
          backgroundColor: theme.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.primary,
            marginBottom: 16,
          }}
        >
          Development
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['projects', 'tools', 'modules'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor:
                  selectedTab === tab ? theme.primary : theme.surfaceLight,
              }}
            >
              <Text
                style={{
                  color: selectedTab === tab ? theme.background : theme.text,
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {selectedTab === 'projects' && (
          <View>
            <FlatList
              data={projects}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: theme.surfaceLight,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                >
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: 'bold' }}>
                    {item.name}
                  </Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 12, marginTop: 4 }}>
                    {item.type}
                  </Text>
                  <View
                    style={{
                      marginTop: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      backgroundColor: theme.background,
                      borderRadius: 4,
                      width: '40%',
                    }}
                  >
                    <Text
                      style={{
                        color: theme.success,
                        fontSize: 11,
                        fontWeight: '600',
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={{
                backgroundColor: theme.primary,
                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: theme.background,
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Create New Project
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'modules' && (
          <View>
            <FlatList
              data={devModules}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: theme.surfaceLight,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={32}
                    color={theme.primary}
                    style={{ marginRight: 12 }}
                  />
                  <View>
                    <Text style={{ color: theme.text, fontSize: 14, fontWeight: 'bold' }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
