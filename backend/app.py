from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# TODO: Replace with actual Azure Functions decorator when deploying
# @app.route('/')
# def index():
#     return jsonify({'status': 'running'})

@app.route('/api/licenses', methods=['GET'])
def get_licenses():
    """
    Retrieve customer license information from database.
    Requires authentication token in Authorization header.
    """
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        # TODO: Implement actual license query from database
        # For now, return mock data
        licenses = {
            'total': 125,
            'types': {
                'Azure AD Premium P1': 45,
                'Azure AD Premium P2': 60,
                'Microsoft 365 E3': 20,
            }
        }

        return jsonify(licenses), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/licenses/adjust', methods=['POST'])
def adjust_licenses():
    """
    Adjust customer license allocation.
    Requires authentication token and JSON payload with license changes.
    """
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        data = request.json
        # TODO: Implement actual license adjustment in database
        return jsonify({'message': 'License adjustment processed', 'changes': data}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/callback', methods=['POST'])
def auth_callback():
    """
    Handle Entra ID authentication callback.
    """
    try:
        # TODO: Implement Entra ID authentication flow
        return jsonify({'message': 'Authentication successful'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(port=7071, debug=True)