export type UserProps = {
  username: string
  email: string
  password: string
}

export class User {
  public props: Required<UserProps>
  public readonly id: string

  constructor(props: UserProps, id?: string) {
    if (
      !props.username ||
      !props.email ||
      !props.password ||
      props.username.trim() === '' ||
      props.email.trim() === '' ||
      props.password.trim() === '' ||
      props.username.length < 3 ||
      props.password.length < 6
    ) {
      throw new Error('Invalid user props.')
    }
    this.props = props
    this.id = id || crypto.randomUUID()
  }

  updateUsername(username: string) {
    if (!username || username.trim() === '' || username.length < 3) {
      throw new Error('Invalid username.')
    }
    this.props.username = username
  }

  updatePassword(password: string) {
    if (!password || password.trim() === '' || password.length < 6) {
      throw new Error('Invalid password.')
    }
    this.props.password = password
  }

  getUsername() {
    return this.props.username
  }

  getEmail() {
    return this.props.email
  }

  getPassword() {
    return this.props.password
  }

  toJSON() {
    return {
      id: this.id,
      username: this.props.username,
      email: this.props.email,
      password: this.props.password,
    }
  }
}
