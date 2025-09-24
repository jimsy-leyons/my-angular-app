export interface Signin {
	user: AuthUser,
	permissions: RolePermissions[],
	tokens: AuthTokens
}

export interface RolePermissions {
	mpermission_id?: number;
	permissionName?: string;
	status?: number;
}

export interface AuthTokens {
	accessToken: string,
	refreshToken: string
}

export interface AuthUser {
	id?: number,
	firstname?: string,
	middlename?: string,
	lastname?: string,
	date_of_birth?: string,
	mgender_id?: number,
	avatar_url?: string,
	username?: string,
	last_login_date?: string,
	last_login_ip?: string,
	last_login_device?: string,
	last_login_location?: string,
	muser_id?: number,
	mentitytype_id?: number,
	mentity_id?: number
	mrole_id?: number,
	mroleName?: string,
	external_auth_id?: string,
	external_auth_source_id?: string,
	is_username_verified?: number,
	username_verification_code?: string,
	reset_password_code?: string,
	refresh_token?: string,
	created_at?: string,
	created_by?: number,
	updated_at?: string,
	updated_by?: number,
	deleted_at?: string,
	deleted_by?: number,
	status?: number,
	astatus?: number
}