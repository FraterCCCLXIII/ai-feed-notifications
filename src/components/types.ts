export type MessageType = 
  | 'system'
  | 'code'
  | 'build'
  | 'git'
  | 'bug'
  | 'dependency'
  | 'test'
  | 'docs'
  | 'security'
  | 'performance'
  | 'api'
  | 'prompt'
  | 'error';

export type MessageStatus = 
  | 'thinking'
  | 'researching'
  | 'error_llm_authentication'
  | 'error_llm_service_unavailable'
  | 'error_llm_internal_server_error'
  | 'error_llm_out_of_credits'
  | 'error_llm_content_policy_violation'
  | 'error_runtime_disconnected'
  | 'error_runtime_crashed'
  | 'error_action_not_executed';

export interface MessageAction {
  command?: string;
  label: string;
  handler?: () => void;
}

export interface Message {
  id: string;
  type: MessageType;
  status?: MessageStatus;
  content: string;
  code?: string;
  actions?: MessageAction[];
  timestamp: Date;
}