import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import PostsService from './posts.service';
import {CreatePostDto} from './dto/createPost.dto';
import {UpdatePostDto} from './dto/updatePost.dto';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import { FindOneParams } from 'src/utils/findOneParams';
 
@Controller('posts')
export default class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}
 
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
 
    @Get(':id')
    @UseFilters(ExceptionsLoggerFilter)
    getPostById(@Param() { id }: FindOneParams) {
        return this.postsService.getPostById(Number(id));
      }
 
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }
 
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }
 
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}