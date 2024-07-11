# from flask import Flask, request, jsonify
# import pandas as pd
# from recommendation import build_model, recommend_unliked_posts

# app = Flask(__name__)

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.json
#     liked_posts = data.get('liked_posts')
#     unliked_posts = data.get('unliked_posts')

#     liked_posts_df = pd.DataFrame(liked_posts)
#     unliked_posts_df = pd.DataFrame(unliked_posts)

#     # Huấn luyện mô hình và gợi ý bài viết
#     model = build_model(liked_posts_df, unliked_posts_df)
#     top_n = int(request.args.get('top_n', 5))  # Lấy tham số top_n từ URL nếu có
#     recommended_posts = recommend_unliked_posts(liked_posts_df, unliked_posts_df, model, top_n)

#     # Chuyển đổi DataFrame thành danh sách từ điển
#     recommended_posts_list = recommended_posts.to_dict(orient='records')

#     return jsonify(recommended_posts_list)

# if __name__ == '__main__':
#     app.run(debug=True)
# from flask import Flask, request, jsonify
# import pandas as pd
# from recommendation import build_model, recommend_unliked_posts

# app = Flask(__name__)

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.json
#     liked_posts = data.get('liked_posts')
#     unliked_posts = data.get('unliked_posts')

#     liked_posts_df = pd.DataFrame(liked_posts)
#     unliked_posts_df = pd.DataFrame(unliked_posts)

#     # Huấn luyện mô hình và gợi ý bài viết
#     model = build_model(liked_posts_df, unliked_posts_df)
#     top_n = int(request.args.get('top_n', 5))  # Lấy tham số top_n từ URL nếu có
#     recommended_posts = recommend_unliked_posts(liked_posts_df, unliked_posts_df, model, top_n)

#     # Chuyển đổi DataFrame thành danh sách từ điển
#     recommended_posts_list = recommended_posts.to_dict(orient='records')

#     return jsonify(recommended_posts_list)

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
import pandas as pd
from recommendation import build_model, recommend_unliked_posts

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    liked_posts = data.get('liked_posts')
    unliked_posts = data.get('unliked_posts')

    liked_posts_df = pd.DataFrame(liked_posts)
    unliked_posts_df = pd.DataFrame(unliked_posts)

    # Huấn luyện mô hình và gợi ý bài viết
    model = build_model(liked_posts_df, unliked_posts_df)
    min_similarity = float(request.args.get('min_similarity', 0.3))  # Lấy tham số min_similarity từ URL nếu có
    top_n = int(request.args.get('top_n', 5))  # Lấy tham số top_n từ URL nếu có
    recommended_posts = recommend_unliked_posts(liked_posts_df, unliked_posts_df, model, min_similarity, top_n)

    # Chuyển đổi DataFrame thành danh sách từ điển
    recommended_posts_list = recommended_posts.to_dict(orient='records')

    return jsonify(recommended_posts_list)

if __name__ == '__main__':
    app.run(debug=True)

