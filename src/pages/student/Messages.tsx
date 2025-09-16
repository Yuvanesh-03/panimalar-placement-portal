import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  Circle,
  Image,
  File,
  Phone,
  Video,
  Info,
  MessageSquare
} from 'lucide-react'
import { Card, Button, Input } from '../../components/ui'

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: 'text' | 'file' | 'image'
  status: 'sent' | 'delivered' | 'read'
  attachment?: {
    name: string
    url: string
    type: string
  }
}

interface Conversation {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('1')
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'HR Manager',
      company: 'Tech Mahindra',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'When would you be available for the final interview?',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: 'm1',
          senderId: 'recruiter-1',
          senderName: 'Sarah Johnson',
          content: 'Hi John! Congratulations on clearing the technical round.',
          timestamp: '10:30 AM',
          type: 'text',
          status: 'read'
        },
        {
          id: 'm2',
          senderId: 'student-1',
          senderName: 'John Doe',
          content: 'Thank you so much! I am really excited about this opportunity.',
          timestamp: '10:32 AM',
          type: 'text',
          status: 'read'
        },
        {
          id: 'm3',
          senderId: 'recruiter-1',
          senderName: 'Sarah Johnson',
          content: 'When would you be available for the final interview?',
          timestamp: '2 min ago',
          type: 'text',
          status: 'delivered'
        }
      ]
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'Technical Lead',
      company: 'Infosys',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Please find the assignment attached',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 'm4',
          senderId: 'recruiter-2',
          senderName: 'Rajesh Kumar',
          content: 'Hi! Thanks for your interest in the Software Engineer position.',
          timestamp: 'Yesterday',
          type: 'text',
          status: 'read'
        },
        {
          id: 'm5',
          senderId: 'recruiter-2',
          senderName: 'Rajesh Kumar',
          content: 'Please find the assignment attached',
          timestamp: '1 hour ago',
          type: 'file',
          status: 'read',
          attachment: {
            name: 'coding-assignment.pdf',
            url: '#',
            type: 'pdf'
          }
        }
      ]
    },
    {
      id: '3',
      name: 'Priya Sharma',
      role: 'Placement Officer',
      company: 'College Placement Cell',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Your resume has been shortlisted for 3 companies',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: 'm6',
          senderId: 'officer-1',
          senderName: 'Priya Sharma',
          content: 'Your resume has been shortlisted for 3 companies',
          timestamp: '3 hours ago',
          type: 'text',
          status: 'delivered'
        }
      ]
    }
  ]

  const currentConversation = conversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-600' : ''
              }`}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-1">{conversation.role} • {conversation.company}</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="ml-2 min-w-[20px] h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {currentConversation.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {currentConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {currentConversation.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {currentConversation.role} • {currentConversation.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentConversation.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.senderId.startsWith('student') ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.senderId.startsWith('student') ? 'order-2' : 'order-1'
                  }`}>
                    {!message.senderId.startsWith('student') && (
                      <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>
                    )}
                    
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.senderId.startsWith('student')
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}>
                      {message.type === 'file' && message.attachment ? (
                        <div className="flex items-center space-x-2">
                          <File className="w-4 h-4" />
                          <div>
                            <p className="text-sm">{message.attachment.name}</p>
                            <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                              Download
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                    
                    <div className={`flex items-center mt-1 space-x-1 ${
                      message.senderId.startsWith('student') ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.senderId.startsWith('student') && (
                        <div className="text-gray-400">
                          {message.status === 'sent' && <Check className="w-3 h-3" />}
                          {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                          {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </Button>
                
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="rounded-full"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages